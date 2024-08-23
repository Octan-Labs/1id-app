import { eq, isNull, or, and, gte } from "drizzle-orm";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import {
  airdropCampaigns,
  campaignWhitelistedWallets,
  wallets,
} from "~/server/db/schema";
import { z } from "zod";
import { db } from "~/server/db";
// id: varchar("id", { length: 36 })
//   .primaryKey()
//   .$defaultFn(() => uuidv7()),
// address: varchar("address", { length: 255 }).notNull(),
// name: varchar("name", { length: 255 }).notNull(),
// href: varchar("href", { length: 255 }).notNull().default("#"),
// logo: varchar("logo", { length: 255 }),
// token: varchar("token", { length: 255 }).notNull(),
// startTime: timestamp("start_time", {
//   mode: "date",
//   withTimezone: true,
// }),
// endTime: timestamp("end_time", {
//   mode: "date",
//   withTimezone: true,
// }),
// totalStaked: integer("total_staked").notNull().default(0),
// requirements: jsonb("requirements"),

export const campaignRouter = createTRPCRouter({
  //TODO: Add filter for ongoing campaigns later if required
  allCampaigns: publicProcedure.query(async ({ ctx }) => {
    const subquery = db
      .select()
      .from(campaignWhitelistedWallets)
      .where(
        eq(
          campaignWhitelistedWallets.walletAddress,
          ctx.session?.address ?? "",
        ),
      )
      .as("subquery");
    const campaigns = await ctx.db
      .select({
        campaignId: airdropCampaigns.id,
        address: airdropCampaigns.address,
        name: airdropCampaigns.name,
        href: airdropCampaigns.href,
        logo: airdropCampaigns.logo,
        token: airdropCampaigns.token,
        startTime: airdropCampaigns.startTime,
        endTime: airdropCampaigns.endTime,
        totalStaked: airdropCampaigns.totalStaked,
        requirements: airdropCampaigns.requirements,
        claimed: subquery.walletAddress,
      })
      .from(airdropCampaigns)
      .leftJoin(
        subquery,
        or(
          eq(airdropCampaigns.id, subquery.airdropCampaignId),
          isNull(subquery.walletAddress),
        ),
      )
      .orderBy(airdropCampaigns.endTime)
      .where(isNull(airdropCampaigns.deletedAt))
      .execute();

    return campaigns;
  }),
  whitelistWallet: protectedProcedure
    .input(
      z.object({
        campaignId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const wallet = await ctx.db.query.wallets.findFirst({
        where: eq(wallets.address, ctx.session?.address),
      });
      if (!wallet) throw new Error("Wallet not found");
      const eligibleCampaigns = await ctx.db.query.airdropCampaigns.findFirst({
        where: and(
          eq(airdropCampaigns.id, input.campaignId),
          or(
            isNull(airdropCampaigns.endTime),
            gte(airdropCampaigns.endTime, new Date()),
          ),
          isNull(airdropCampaigns.deletedAt),
        ),
      });
      if (!eligibleCampaigns) throw new Error("Campaign not found");
      return await ctx.db
        .insert(campaignWhitelistedWallets)
        .values({
          walletAddress: wallet?.address,
          airdropCampaignId: input.campaignId,
        })
        .returning()
        .execute();
    }),
});

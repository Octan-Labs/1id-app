import { eq, isNull, or, and } from "drizzle-orm";

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
        claimed: wallets.address,
      })
      .from(airdropCampaigns)
      .leftJoin(
        campaignWhitelistedWallets,
        eq(airdropCampaigns.id, campaignWhitelistedWallets.airdropCampaignId),
      )
      .leftJoin(
        wallets,
        and(
          eq(campaignWhitelistedWallets.walletId, wallets.id),
          eq(wallets.address, ctx.session?.address || ""),
        ),
      )
      .execute();
    console.log(campaigns);

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
      if (!wallet) return;
      return await ctx.db
        .insert(campaignWhitelistedWallets)
        .values({
          walletId: wallet?.id,
          airdropCampaignId: input.campaignId,
        })
        .returning()
        .execute();
    }),
});

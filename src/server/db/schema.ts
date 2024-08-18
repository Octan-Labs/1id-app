import { relations, sql } from "drizzle-orm";
import {
  index,
  integer,
  jsonb,
  pgTableCreator,
  primaryKey,
  serial,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";
import { v7 as uuidv7 } from "uuid";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `1id_${name}`);

export const wallets = createTable(
  "wallet",
  {
    address: varchar("address", { length: 255 }).primaryKey(),
    userId: varchar("user_id", { length: 36 }).references(() => users.id),
    chainId: varchar("chain_id", { length: 255 }).notNull(),
  },
  (table) => ({
    nameIdx: index("wallet_userId_idx").on(table.userId),
    addressIdx: uniqueIndex("wallet_address_idx").on(table.address),
  }),
);

export const walletRelations = relations(wallets, ({ one, many }) => ({
  user: one(users, {
    fields: [wallets.userId],
    references: [users.id],
  }),
  airdropCampaign: many(campaignWhitelistedWallets),
}));

export const users = createTable(
  "user",
  {
    id: varchar("id", { length: 36 })
      .primaryKey()
      .$defaultFn(() => uuidv7()),
    email: varchar("email", { length: 255 }).notNull().unique(),
    emailVerified: timestamp("email_verified", {
      mode: "date",
      withTimezone: true,
    }).default(sql`CURRENT_TIMESTAMP`),
    image: varchar("image", { length: 255 }),
  },
  (table) => ({
    emailIdx: uniqueIndex("user_email_idx").on(table.email),
  }),
);

export const userRelations = relations(users, ({ one, many }) => ({
  userProfile: one(userProfiles),
  userWallets: many(wallets),
}));

export const userProfiles = createTable(
  "user_profile",
  {
    id: serial("id").primaryKey(),
    userId: varchar("user_id", { length: 36 })
      .references(() => users.id)
      .unique(),
  },
  (table) => ({
    userIdIdx: uniqueIndex("user_profile_userId_idx").on(table.userId),
  }),
);

export const useProfileRelations = relations(userProfiles, ({ one }) => ({
  user: one(users, {
    fields: [userProfiles.userId],
    references: [users.id],
  }),
}));

export const verificationTokens = createTable(
  "verification_token",
  {
    identifier: varchar("identifier", { length: 255 }).notNull(),
    token: varchar("token", { length: 255 }).notNull(),
    expires: timestamp("expires", {
      mode: "date",
      withTimezone: true,
    }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  }),
);

export const airdropCampaigns = createTable("airdrop_campaign", {
  id: varchar("id", { length: 36 })
    .primaryKey()
    .$defaultFn(() => uuidv7()),
  address: varchar("address", { length: 255 }).notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  href: varchar("href", { length: 255 }).notNull().default("#"),
  logo: varchar("logo", { length: 255 }),
  token: varchar("token", { length: 255 }).notNull(),
  startTime: timestamp("start_time", {
    mode: "date",
    withTimezone: true,
  }),
  endTime: timestamp("end_time", {
    mode: "date",
    withTimezone: true,
  }),
  totalStaked: integer("total_staked").notNull().default(0),
  requirements: jsonb("requirements"),
});

export const airdropCampaignRelations = relations(
  airdropCampaigns,
  ({ many }) => ({
    whitelistedUsers: many(campaignWhitelistedWallets),
  }),
);

export const campaignWhitelistedWallets = createTable(
  "campaign_whitelisted_wallet",
  {
    walletAddress: varchar("wallet_address", { length: 255 })
      .notNull()
      .references(() => wallets.address),
    airdropCampaignId: varchar("airdrop_campaign_id", { length: 36 })
      .notNull()
      .references(() => airdropCampaigns.id),
    createdAt: timestamp("created_at", {
      mode: "date",
      withTimezone: true,
    })
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.walletAddress, table.airdropCampaignId] }),
  }),
);

export const campaignWhitelistedUsersRelations = relations(
  campaignWhitelistedWallets,
  ({ one }) => ({
    wallet: one(wallets, {
      fields: [campaignWhitelistedWallets.walletAddress],
      references: [wallets.address],
    }),
    airdropCampaign: one(airdropCampaigns, {
      fields: [campaignWhitelistedWallets.airdropCampaignId],
      references: [airdropCampaigns.id],
    }),
  }),
);

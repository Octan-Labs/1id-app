import { relations, sql } from "drizzle-orm";
import {
  index,
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
    id: varchar("id", { length: 36 })
      .primaryKey()
      .$defaultFn(() => uuidv7()),
    address: varchar("address", { length: 255 }).notNull().unique(),
    userId: varchar("user_id", { length: 36 }).references(() => users.id),
    chainId: varchar("chain_id", { length: 255 }).notNull(),
  },
  (table) => ({
    nameIdx: index("wallet_userId_idx").on(table.userId),
    addressIdx: uniqueIndex("wallet_address_idx").on(table.address),
  }),
);

export const walletRelations = relations(wallets, ({ one }) => ({
  user: one(users, {
    fields: [wallets.userId],
    references: [users.id],
  }),
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

import { eq } from "drizzle-orm";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { wallets } from "~/server/db/schema";

export const userRouter = createTRPCRouter({
  me: protectedProcedure.query(async ({ ctx }) => {
    console.log("session", ctx.session);
    const wallet = await ctx.db.query.wallets.findFirst({
      where: eq(wallets.address, ctx.session?.address),
      with: {
        user: true,
      },
    });

    return wallet;
  }),
  // const user = await ctx.db.query.users.findFirst({
  //   where: users
  // })}),
});

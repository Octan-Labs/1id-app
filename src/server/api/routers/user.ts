import { eq } from "drizzle-orm";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { users, wallets } from "~/server/db/schema";

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
  verifyEmail: protectedProcedure
    .input(
      z.object({
        email: z.string().email(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const wallet = await ctx.db.query.wallets.findFirst({
        where: eq(wallets.address, ctx.session.address),
        with: {
          user: true,
        },
      });

      if (!wallet) {
        throw new Error("Wallet not found");
      }

      if (!wallet.user) {
        const newUser = await ctx.db
          .insert(users)
          .values({
            email: input.email,
          })
          .onConflictDoNothing()
          .returning({ insertedId: users.id });
        await ctx.db
          .update(wallets)
          .set({
            userId: newUser.pop()?.insertedId,
          })
          .where(eq(wallets.address, ctx.session.address))
          .execute();
        return wallet;
      }

      await ctx.db
        .update(users)
        .set({ email: input.email })
        .where(eq(users.id, wallet.user.id))
        .execute();

      return wallet;
    }),
  // const user = await ctx.db.query.users.findFirst({
  //   where: users
  // })}),
});

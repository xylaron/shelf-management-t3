import { router, publicProcedure } from "../trpc";
import { z } from "zod";

export const transactionsRouter = router({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.transactions.findMany();
  }),

  getTransactionsByPage: publicProcedure
    .input(z.object({ selectedPage: z.number(), pageSize: z.number() }))
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.transactions.findMany({
        skip: input.selectedPage * input.pageSize,
        take: input.pageSize,
      });
    }),
});

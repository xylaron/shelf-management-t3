import { router, publicProcedure } from "../trpc";

export const transactionsRouter = router({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.transactions.findMany();
  }),
});

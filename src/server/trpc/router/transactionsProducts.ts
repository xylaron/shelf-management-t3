import { router, publicProcedure } from "../trpc";

export const transactionsProductsRouter = router({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.transactions_Products.findMany({
      orderBy: [
        {
          transactionId: "asc",
        },
      ],
    });
  }),
});

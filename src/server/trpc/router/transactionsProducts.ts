import { router, publicProcedure } from "../trpc";
import { z } from "zod";

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
  getById: publicProcedure
    .input(
      z.object({
        transactionId: z.number(),
      })
    )
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.transactions_Products.findMany({
        where: {
          transactionId: input.transactionId,
        },
      });
    }),
});

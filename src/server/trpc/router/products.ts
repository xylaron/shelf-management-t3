import { router, publicProcedure } from "../trpc";

export const productsRouter = router({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.products.findMany();
  }),
});

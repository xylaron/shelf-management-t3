import { router, publicProcedure } from "../trpc";

export const usersRouter = router({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.users.findMany();
  }),
});

import { router, publicProcedure } from "../trpc";
import { z } from "zod";

export const shelvesRouter = router({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.shelves.findMany();
  }),
  create: publicProcedure
    .input(
      z.object({
        name: z.string(),
        width: z.number(),
        height: z.number(),
        depth: z.number(),
        weight_capacity: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.shelves.create({
        data: {
          name: input.name,
          width: input.width,
          height: input.height,
          depth: input.depth,
          weight_capacity: input.weight_capacity,
        },
      });
    }),
  delete: publicProcedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.shelves.delete({
        where: {
          id: input.id,
        },
      });
    }),
});

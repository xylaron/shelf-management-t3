import { router, publicProcedure } from "../trpc";
import { z } from "zod";

export const shelvesRouter = router({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.shelves.findMany({
      orderBy: [
        {
          created_at: "asc",
        },
      ],
    });
  }),
  getById: publicProcedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.shelves.findUnique({
        where: {
          id: input.id,
        },
      });
    }),
  create: publicProcedure
    .input(
      z.object({
        name: z.string(),
        width: z.number(),
        height: z.number(),
        depth: z.number(),
        weight_capacity: z.number(),
        cubbyhole_count: z.number(),
        divider_height: z.number(),
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
          cubbyhole_count: input.cubbyhole_count,
          divider_height: input.divider_height,
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
  edit: publicProcedure
    .input(
      z.object({
        id: z.number(),
        name: z.string(),
        width: z.number(),
        height: z.number(),
        depth: z.number(),
        weight_capacity: z.number(),
        cubbyhole_count: z.number(),
        divider_height: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.shelves.update({
        where: {
          id: input.id,
        },
        data: {
          name: input.name,
          width: input.width,
          height: input.height,
          depth: input.depth,
          weight_capacity: input.weight_capacity,
          cubbyhole_count: input.cubbyhole_count,
          divider_height: input.divider_height,
        },
      });
    }),
});

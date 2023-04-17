import { z } from "zod";
import { router, publicProcedure } from "../trpc";

export const layoutsRouter = router({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.layouts.findMany({
      orderBy: [
        {
          id: "asc",
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
      return await ctx.prisma.layouts.findUnique({
        where: {
          id: input.id,
        },
      });
    }),
  create: publicProcedure
    .input(
      z.object({
        name: z.string(),
        layout: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.layouts.create({
        data: {
          name: input.name,
          layout: input.layout,
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
      return await ctx.prisma.layouts.delete({
        where: {
          id: input.id,
        },
      });
    }),
});

import { router } from "../trpc";
import { exampleRouter } from "./example";
import { productsRouter } from "./products";

export const appRouter = router({
  products: productsRouter,
  example: exampleRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

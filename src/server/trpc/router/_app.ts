import { router } from "../trpc";
import { exampleRouter } from "./example";
import { productsRouter } from "./products";
import { transactionsRouter } from "./transactions";

export const appRouter = router({
  products: productsRouter,
  transactions: transactionsRouter,
  example: exampleRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

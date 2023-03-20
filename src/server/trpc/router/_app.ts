import { router } from "../trpc";
import { exampleRouter } from "./example";
import { productsRouter } from "./products";
import { transactionsRouter } from "./transactions";
import { shelvesRouter } from "./shelves";

export const appRouter = router({
  products: productsRouter,
  transactions: transactionsRouter,
  example: exampleRouter,
  shelves: shelvesRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

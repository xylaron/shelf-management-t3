import { router } from "../trpc";
import { productsRouter } from "./products";
import { transactionsRouter } from "./transactions";
import { shelvesRouter } from "./shelves";
import { usersRouter } from "./users";
import { transactionsProductsRouter } from "./transactionsProducts";

export const appRouter = router({
  products: productsRouter,
  transactions: transactionsRouter,
  shelves: shelvesRouter,
  users: usersRouter,
  transactionsProducts: transactionsProductsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

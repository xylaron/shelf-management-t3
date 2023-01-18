import { generateTransactions } from "utils/generateData";
import { prisma } from "../src/server/db/client";
import { sampleProducts } from "utils/sampleProducts";

async function main() {
  if (process.env.NODE_ENV !== "development") return;

  // Delete Reset the autoincrement counter using raw (differs from db solutions)
  // This method is for Postgresql ONLY
  await prisma.$queryRaw`TRUNCATE Products RESTART IDENTITY;`;
  await prisma.$queryRaw`TRUNCATE Transactions RESTART IDENTITY`;

  //Assigns data from sampleProducts
  for (const product of sampleProducts) {
    const item = await prisma.products.create({
      data: product,
    });
    console.log(item);
  }

  //Assigns data from generateTransactions funcion
  for (const transaction of generateTransactions(1000)) {
    const item = await prisma.transactions.create({
      data: {
        productId: transaction.productId,
        quantity: transaction.quantity,
        time: transaction.time,
      },
    });
    console.log(item);
  }
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

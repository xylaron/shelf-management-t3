import {
  generateTransactions,
  generateSingleTransaction,
} from "utils/generateData";
import { prisma } from "../src/server/db/client";
import { sampleProducts } from "utils/sampleProducts";

async function main() {
  if (process.env.NODE_ENV !== "development") return;

  await prisma.products.deleteMany();
  await prisma.transactions_Products.deleteMany();
  await prisma.transactions.deleteMany();

  for (const product of sampleProducts) {
    const item = await prisma.products.create({
      data: product,
    });
    console.log("Added to Products Table: ", item);
  }

  const singleTransactionsOutput = generateSingleTransaction(4400);
  const transactionsOutput = generateTransactions(singleTransactionsOutput);

  for (const transaction of transactionsOutput) {
    const item = await prisma.transactions.create({
      data: transaction,
    });
    console.log("Added to Transactions Table: ", item);
  }

  for (const singleTransaction of singleTransactionsOutput.singleTransactions) {
    const item = await prisma.transactions_Products.create({
      data: singleTransaction,
    });
    console.log("Added to Transactions_Products Table: ", item);
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

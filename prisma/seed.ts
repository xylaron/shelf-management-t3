import { prisma } from "../src/server/db/client";
import { sampleProducts } from "utils/sampleProducts";

async function main() {
  if (process.env.NODE_ENV !== "development") return;

  // Delete all existing data
  await prisma.products.deleteMany();
  await prisma.transactions.deleteMany();
  // Reset the autoincrement counter
  await prisma.$queryRaw`UPDATE sqlite_sequence SET seq = 0 WHERE name = 'Products'`;

  for (const product of sampleProducts) {
    const item = await prisma.products.create({
      data: product,
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

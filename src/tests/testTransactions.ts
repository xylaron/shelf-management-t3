import {
  generateSingleTransaction,
  generateTransactions,
} from "utils/generateData";

export const testTransactions = () => {
  const singleTransactionsOutput = generateSingleTransaction(300);
  const transactionsOutput = generateTransactions(singleTransactionsOutput);
  console.log(
    "Generated Single Transactions:",
    singleTransactionsOutput.singleTransactions
  );
  console.log("\n");
  console.log("Generated Transactions:", transactionsOutput);

  const productIds = singleTransactionsOutput.singleTransactions.map(
    (singleTransaction) => singleTransaction.productId
  );
  const productIdCount = productIds.reduce((acc, curr) => {
    acc[curr] = (acc[curr] || 0) + 1;
    return acc;
  }, {} as { [key: number]: number });

  console.log("Product Id Count:", productIdCount);
};

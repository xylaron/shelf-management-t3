import {
  generateSingleTransaction,
  generateTransactions,
} from "utils/generateData";

export const testTransactions = () => {
  const singleTransactionsOutput = generateSingleTransaction(10);
  const transactionsOutput = generateTransactions(singleTransactionsOutput);
  console.log(
    "Generated Single Transactions:",
    singleTransactionsOutput.singleTransactions
  );
  console.log("\n");
  console.log("Generated Transactions:", transactionsOutput);
};

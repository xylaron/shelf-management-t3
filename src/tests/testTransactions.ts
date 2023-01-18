import { generateTransactions } from "utils/generateData";

export const testTransactions = () => {
  const transactions = generateTransactions(500);
  console.log("Generated Transactions:", transactions);
};

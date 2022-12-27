import { faker } from "@faker-js/faker";
import { Transaction } from "types";

export const generateNames = () => {
  const names = new Array<string>();
  const checkNames = new Set<string>();
  while (names.length < 100) {
    const name = faker.name.firstName() + " " + faker.name.lastName();
    if (!checkNames.has(name)) {
      names.push(name);
      checkNames.add(name);
    }
  }
  return names;
};

export const generateTransactions = () => {
  const transactions = new Array<Transaction>();
  const openingTime = new Date(2020, 0, 1, 9, 0, 0); // 9:00 AM
  const closingTime = new Date(2020, 0, 1, 22, 0, 0); // 10:00 PM
  while (transactions.length < 10) {
    const transaction: Transaction = {} as Transaction;
    transaction.id = transactions.length;
    transaction.product = faker.commerce.product();
    transaction.quantity = Math.round(faker.datatype.float({ max: 10 }));
    transaction.time = faker.date.between(openingTime, closingTime);
    transactions.push(transaction);
  }
  return transactions;
};

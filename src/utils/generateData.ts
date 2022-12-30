import { faker } from "@faker-js/faker";
import { type Transactions } from "types";
import { sampleProducts } from "utils/sampleProducts";

export const generateNames = (dataNum: number) => {
  const names = new Array<string>();
  const checkNames = new Set<string>();
  while (names.length < dataNum) {
    const name = faker.name.firstName() + " " + faker.name.lastName();
    if (!checkNames.has(name)) {
      names.push(name);
      checkNames.add(name);
    }
  }
  return names;
};

export const generateTransactions = (dataNum: number) => {
  const transactions = new Array<Transactions>();
  const openingTime = new Date(2020, 0, 1, 9, 0, 0); // 9:00 AM
  const closingTime = new Date(2020, 0, 1, 22, 0, 0); // 10:00 PM
  while (transactions.length < dataNum) {
    const transaction: Transactions = {} as Transactions;
    transaction.id = transactions.length + 1;
    transaction.product =
      sampleProducts[faker.datatype.number({ max: sampleProducts.length - 1 })]
        ?.name || "";
    transaction.quantity = faker.datatype.number({ min: 1, max: 10 });
    transaction.time = faker.date.between(openingTime, closingTime);
    transactions.push(transaction);
  }
  return transactions;
};

import { faker } from "@faker-js/faker";
import { type Transactions } from "@prisma/client";
import { sampleProducts } from "utils/sampleProducts";

//to be removed later
export const generateNames = (dataNum: number) => {
  //initialize variables/constraints/array
  const names = new Array<string>();
  const checkNames = new Set<string>();

  //generate data
  while (names.length < dataNum) {
    const name = faker.name.firstName() + " " + faker.name.lastName();
    if (!checkNames.has(name)) {
      names.push(name);
      checkNames.add(name);
    }
  }
  return names;
};

export const generateTransactions_OLD = (dataNum: number) => {
  //initialize variables/constraints/array
  const transactions = new Array<Transactions>();

  const startingHour = new Date().setHours(9, 0, 0, 0);
  const closingHour = new Date().setHours(23, 0, 0, 0);

  const startDate = new Date(2022, 0, 1);
  const endDate = new Date(2022, 0, 31);

  //generate data
  while (transactions.length < dataNum) {
    const transaction: Transactions = {} as Transactions;
    transaction.id = transactions.length + 1;
    transaction.productId = faker.datatype.number({
      min: 1,
      max: sampleProducts.length,
    });
    transaction.quantity = faker.datatype.number({ min: 1, max: 10 });

    const hour = faker.date.between(startingHour, closingHour);
    const date = faker.date.between(startDate, endDate);
    transaction.time = new Date(date.setHours(hour.getHours()));

    transactions.push(transaction);
  }

  //sort data by time
  transactions.sort((a, b) => {
    return a.time.getTime() - b.time.getTime();
  });

  //reassign id
  transactions.forEach((transaction, index) => {
    transaction.id = index + 1;
  });

  console.log(transactions);
  return transactions;
};

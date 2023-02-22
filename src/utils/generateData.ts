import { faker } from "@faker-js/faker";
import {
  type Transactions,
  Transactions_Products as SingleTransaction,
} from "@prisma/client";
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

export const generateSingleTransaction = (totalTransactions: number) => {
  const singleTransactions = new Array<SingleTransaction>();

  const boughtProductsWeightPool = [1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 3, 3];
  const productAmountWeightPool = [
    1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 5,
  ];
  const productIdWeightPool = getProductIdWeightPool();

  for (let i = 0; i < totalTransactions; i++) {
    const amountOfBoughtProducts =
      boughtProductsWeightPool[
        faker.datatype.number({
          min: 1,
          max: boughtProductsWeightPool.length - 1,
        })
      ] || 1;

    for (let j = 0; j < amountOfBoughtProducts; j++) {
      const singleTransaction = {} as SingleTransaction;

      singleTransaction.transactionId = i + 1;

      singleTransaction.productId =
        productIdWeightPool[
          faker.datatype.number({
            min: 1,
            max: productIdWeightPool.length - 1,
          })
        ] || 1;

      singleTransaction.quantity =
        productAmountWeightPool[
          faker.datatype.number({
            min: 1,
            max: productAmountWeightPool.length - 1,
          })
        ] || 1;
      singleTransaction.total_price =
        singleTransaction.quantity *
        // @ts-ignore - to be fixed
        sampleProducts[singleTransaction.productId - 1].price;

      singleTransactions.push(singleTransaction);
    }
  }

  const checkDuplicates = new Set<string>();
  const filteredSingleTransactions = singleTransactions.filter((item) => {
    const key = `${item.transactionId}-${item.productId}`;
    const duplicate = checkDuplicates.has(key);
    checkDuplicates.add(key);
    return !duplicate;
  });

  return {
    totalTransactions: totalTransactions,
    singleTransactions: filteredSingleTransactions,
  };
};

export const generateTransactions = (singleTransactionsOutput: {
  totalTransactions: number;
  singleTransactions: SingleTransaction[];
}) => {
  const { totalTransactions, singleTransactions } = singleTransactionsOutput;

  const transactions = new Array<Transactions>();

  const startingHour = new Date(0, 0, 0, 9, 0, 0, 0);
  const closingHour = new Date(0, 0, 0, 23, 0, 0, 0);

  const startDate = new Date(2023, 0, 1);
  const endDate = new Date(2023, 1, 1);

  for (let i = 0; i < totalTransactions; i++) {
    const transaction = {} as Transactions;

    transaction.id = i + 1;

    const hour = faker.date.between(startingHour, closingHour);
    const date = faker.date.between(startDate, endDate);

    transaction.time = new Date(date.setHours(hour.getHours()));

    transactions.push(transaction);
  }

  transactions.sort((a, b) => {
    return a.time.getTime() - b.time.getTime();
  });

  transactions.forEach((transaction, index) => {
    transaction.id = index + 1;
  });

  for (let i = 0; i < totalTransactions; i++) {
    const filteredSingleTransactions = singleTransactions.filter(
      (singleTransaction) => singleTransaction.transactionId === i + 1
    );

    const transaction = transactions[i] as Transactions;

    transaction.total_price = filteredSingleTransactions.reduce(
      (acc, filteredSingleTransactions) => {
        return acc + filteredSingleTransactions.total_price;
      },
      0
    );
  }

  return transactions;
};

const getProductIdWeightPool = () => {
  const weightPool = new Array<number>();

  const weights = [18, 14, 12, 9, 6, 4, 2];

  for (let i = 0; i < sampleProducts.length; i++) {
    // @ts-ignore - to be fixed
    for (let j = 0; j < weights[i]; j++) {
      weightPool.push(i + 1);
    }
  }

  console.log("Weight Pool: ", weightPool);
  return weightPool;
};

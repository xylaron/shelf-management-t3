import { type NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import { Transaction } from "types";
import { generateTransactions } from "utils/generateData";

const Transactions: NextPage = () => {
  const [transactionsList, setTransactionsList] = useState<Transaction[]>([]);

  useEffect(() => {
    const transactions = generateTransactions();
    setTransactionsList(transactions);
  }, []);

  const checkTransactions = () => console.log(transactionsList);

  return (
    <>
      <Head>
        <title>Transactions - Shelf Management App</title>
      </Head>
      <main className="flex min-h-screen flex-col items-center">
        <div className="container flex flex-col items-center gap-12 px-4 pt-16 pb-8">
          <h1 className="tracking text-6xl font-extrabold text-white">
            <span className="text-purple-500">Transactions</span> Page
          </h1>
        </div>
        <div className="flex flex-col gap-4 pt-8 pb-16 text-2xl font-bold">
          <button type="button" onClick={checkTransactions}>
            Check Transactions
          </button>
        </div>
      </main>
    </>
  );
};

export default Transactions;

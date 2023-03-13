import { type NextPage } from "next";
import Head from "next/head";
import Table from "components/transactions/Table";
import { trpc } from "utils/trpc";
import { useState } from "react";

const Transactions: NextPage = () => {
  const [selectedPage, setSelectedPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const transactions = trpc.transactions.getTransactionsByPage.useQuery({
    selectedPage: selectedPage - 1 || 0,
    pageSize: pageSize,
  });

  const transactionsList = transactions.data || [];

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
        <div>
          <div className="flex flex-row gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-white">Page Size</label>
              <select
                className="h-6 w-16 px-2 text-black"
                value={pageSize}
                onChange={(e) => setPageSize(parseInt(e.target.value))}
              >
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-white">Page</label>
              <input
                className="h-6 w-16 px-2 text-black"
                type="number"
                value={selectedPage}
                onChange={(e) => setSelectedPage(parseInt(e.target.value))}
              ></input>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 pt-8 pb-16 text-2xl font-bold">
          <Table transactionsList={transactionsList} />
        </div>
      </main>
    </>
  );
};

export default Transactions;

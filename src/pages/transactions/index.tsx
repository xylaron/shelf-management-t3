import { type NextPage } from "next";
import Head from "next/head";
import { trpc } from "utils/trpc";
import { type Transactions } from "@prisma/client";
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
      <main className="flex flex-col items-center">
        <div className="container flex flex-col items-center gap-12 px-4 pt-16 pb-8">
          <h1 className="tracking text-6xl font-extrabold text-white">
            <span>Transactions</span> Page
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

const Table: React.FC<{ transactionsList: Transactions[] }> = ({
  transactionsList,
}) => {
  if (transactionsList.length === 0) {
    return <div className="text-xl text-white">No Transactions Found</div>;
  }

  const table = transactionsList.map(({ id, total_price, time }) => {
    return (
      <tr key={id}>
        <td>{id}</td>
        <td>{total_price}</td>
        <td>{time.toString()}</td>
      </tr>
    );
  });

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Total Price</th>
          <th>Time</th>
        </tr>
      </thead>
      <tbody>{table}</tbody>
    </table>
  );
};

export default Transactions;

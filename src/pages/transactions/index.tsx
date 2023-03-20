import { type NextPage } from "next";
import Head from "next/head";
import { trpc } from "utils/trpc";
import { type Transactions } from "@prisma/client";
import { useState } from "react";

const Transactions: NextPage = () => {
  const [selectedPage, setSelectedPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [transactionsList, setTransactionsList] = useState<Transactions[]>([]);

  const transactions = trpc.transactions.getTransactionsByPage.useQuery(
    {
      selectedPage: selectedPage - 1 || 0,
      pageSize: pageSize,
    },
    {
      onSuccess: (data) => {
        setTransactionsList(data ?? []);
      },
    }
  );

  const preventNonNumberInput = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.code === "Minus" || event.code === "KeyE") {
      event.preventDefault();
    }
  };

  const preventScroll = (event: React.WheelEvent<HTMLInputElement>) => {
    event.currentTarget.blur();
  };

  return (
    <>
      <Head>
        <title>Transactions - Shelf Management App</title>
      </Head>
      <main className="flex flex-col items-center">
        <div className="container flex flex-col items-center gap-12 px-4 py-16">
          <h1 className="tracking text-6xl font-extrabold">
            <span>Transactions</span> Page
          </h1>
        </div>
        <div>
          <div className="flex flex-row gap-4">
            <div className="flex flex-col gap-2">
              <label>Page Size</label>
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
              <label>Page</label>
              <input
                className="h-6 w-16 px-2 text-black"
                type="number"
                value={selectedPage}
                onWheel={preventScroll}
                onKeyPress={preventNonNumberInput}
                onChange={(e) => {
                  if (e.target.value == "0") e.target.value = "1";
                  setSelectedPage(parseInt(e.target.value));
                }}
              ></input>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 pt-8 pb-16 text-2xl">
          {transactions.status == "loading" ? (
            <div className="text-xl">Loading...</div>
          ) : transactions.status == "error" ? (
            <div className="text-xl">Error: {transactions.error.message}</div>
          ) : (
            <Table transactionsList={transactionsList} />
          )}
        </div>
      </main>
    </>
  );
};

const Table: React.FC<{ transactionsList: Transactions[] }> = ({
  transactionsList,
}) => {
  if (transactionsList.length === 0) {
    return <div className="text-xl">No Products Found</div>;
  }

  const table = transactionsList.map(({ id, total_price, time }) => {
    return (
      <tr key={id}>
        <td>{id}</td>
        <td>{total_price}</td>
        <td>{time.toUTCString()}</td>
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

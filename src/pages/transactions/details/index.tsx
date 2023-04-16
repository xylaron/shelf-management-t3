import { type NextPage } from "next";
import Head from "next/head";
import { trpc } from "utils/trpc";
import type { Products, Transactions_Products } from "@prisma/client";
import { useState } from "react";
import { useRouter } from "next/router";

const TransactionDetails: NextPage = () => {
  const router = useRouter();
  const [transactionProductsList, setTransactionProductsList] = useState<
    Transactions_Products[]
  >([]);
  const [productsList, setProductsList] = useState<Products[]>([]);

  const products = trpc.products.getAll.useQuery(undefined, {
    onSuccess: (data) => {
      setProductsList(data);
    },
  });

  const transactionProducts = trpc.transactionsProducts.getById.useQuery(
    {
      transactionId: Number(router.query.id),
    },
    {
      onSuccess: (data) => {
        setTransactionProductsList(data);
      },
    }
  );

  return (
    <>
      <Head>
        <title>Transaction Details - Shelf Management App</title>
      </Head>
      <main className="flex flex-col items-center">
        <div className="container flex flex-col items-center gap-12 px-4 py-16">
          <h1 className="tracking text-6xl font-extrabold">
            <span>Transactions</span> Details
          </h1>
        </div>
        <div className="flex flex-col gap-4 pt-8 pb-16">
          {transactionProducts.isLoading || products.isLoading ? (
            <div className="text-xl">Loading...</div>
          ) : transactionProducts.isError ? (
            <div className="text-xl">
              Error: {transactionProducts.error.message}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-8">
              <div className="text-2xl font-bold">
                Transaction ID: {router.query.id}
              </div>
              <Table
                productsList={productsList}
                transactionProductsList={transactionProductsList}
              />
              <button
                className="rounded bg-red-600 py-2 px-4 font-bold transition-colors hover:bg-red-700 focus:outline-none active:bg-red-800"
                type="submit"
                onClick={() => {
                  router.push("/transactions");
                }}
              >
                Back
              </button>
            </div>
          )}
        </div>
      </main>
    </>
  );
};

const Table: React.FC<{
  transactionProductsList: Transactions_Products[];
  productsList: Products[];
}> = ({ transactionProductsList, productsList }) => {
  if (transactionProductsList.length === 0) {
    return <div className="text-xl">Loading...</div>;
  }

  const table = transactionProductsList.map(
    ({ productId, quantity, total_price }) => {
      return (
        <tr key={productId}>
          <td>{productId}</td>
          <td>{productsList[productId - 1]!.name}</td>
          <td>{quantity}</td>
          <td>{total_price}</td>
        </tr>
      );
    }
  );

  return (
    <table>
      <thead>
        <th>ID</th>
        <th>Name</th>
        <th>Quantity</th>
        <th>Total Price</th>
      </thead>
      <tbody>{table}</tbody>
    </table>
  );
};

export default TransactionDetails;

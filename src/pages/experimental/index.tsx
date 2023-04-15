import { Products, Shelves, Transactions_Products } from "@prisma/client";
import { type NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import { trpc } from "utils/trpc";

interface ProductCount {
  id: number;
  count: number;
}

interface shelfLayout {
  shelfId: number;
  cubby: {
    items: {
      productId: number;
      depthCount: number;
    }[];
  }[];
}

const Experimental: NextPage = () => {
  const [transactionsProductsList, setTransactionsProductsList] = useState<
    Transactions_Products[]
  >([]);
  const [productList, setProductList] = useState<Products[]>([]);
  const [productCount, setProductCount] = useState<ProductCount[]>([]);
  const [shelf, setShelf] = useState<Shelves>();

  const products = trpc.products.getAll.useQuery(undefined, {
    onSuccess: (data) => {
      setProductList(data ?? []);
    },
  });

  const shelfByID = trpc.shelves.getById.useQuery(
    { id: 1 },
    {
      onSuccess: (data) => {
        setShelf(data!);
      },
    }
  );

  const transactionsProducts = trpc.transactionsProducts.getAll.useQuery(
    undefined,
    {
      onSuccess: (data) => {
        setTransactionsProductsList(data ?? []);
      },
    }
  );

  useEffect(() => {
    console.log("Product Id Count:", getProductCount(transactionsProductsList));
    setProductCount(getProductCount(transactionsProductsList));
  }, [transactionsProductsList]);

  const getProductCount = (
    transactionsProductsList: Transactions_Products[]
  ) => {
    const productIds = transactionsProductsList.map(
      (product) => product.productId
    );
    const productIdCountRecord = productIds.reduce((acc, curr) => {
      acc[curr] = (acc[curr] || 0) + 1;
      return acc;
    }, {} as Record<number, number>);

    return Object.entries(productIdCountRecord).map(([key, value]) => ({
      id: parseInt(key),
      count: value,
    }));
  };

  return (
    <>
      <Head>
        <title>Experimental - Shelf Management App</title>
      </Head>
      <main className="flex flex-col items-center">
        <div className="container flex flex-col items-center gap-12 px-4 py-16">
          <h1 className="text-6xl font-extrabold">
            <span>Generate</span> Layout
          </h1>
        </div>
        <div className="flex flex-col items-center justify-center gap-12 py-2">
          {transactionsProducts.isLoading || products.isLoading ? (
            <div className="text-xl">Loading...</div>
          ) : transactionsProducts.isError ? (
            <div className="text-xl">
              Error: {transactionsProducts.error.message}
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </main>
    </>
  );
};

export default Experimental;

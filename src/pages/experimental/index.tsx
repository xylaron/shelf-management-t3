import { Products, Shelves, Transactions_Products } from "@prisma/client";
import { type NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import { ProductCount, ShelfLayout } from "types/types";
import { trpc } from "utils/trpc";
import { distributeProductsOnShelf } from "utils/distributeProducts";

const Experimental: NextPage = () => {
  //data states
  const [transactionsProductsList, setTransactionsProductsList] = useState<
    Transactions_Products[]
  >([]);
  const [productList, setProductList] = useState<Products[]>([]);
  const [productCount, setProductCount] = useState<ProductCount[]>([]);
  const [shelf, setShelf] = useState<Shelves>();
  const [shelfLayout, setShelfLayout] = useState<ShelfLayout>();

  //UI states
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  const getShelfLayout = () => {
    const shelfLayout = distributeProductsOnShelf(
      productCount,
      productList,
      shelf!
    );
    return shelfLayout;
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
            <div className="flex flex-col items-center justify-center gap-12 py-2">
              <button
                className="rounded bg-purple-700 py-2 px-4 font-bold transition-colors hover:bg-purple-800 focus:outline-none active:bg-purple-900"
                type="button"
                onClick={() => {}}
              >
                Generate Layout
              </button>
              {isMenuOpen && <Menu />}
            </div>
          )}
        </div>
      </main>
    </>
  );
};

const Menu: React.FC = () => {
  return (
    <div className=" flex h-full w-full items-center justify-center bg-black">
      <div className="rounded-lg bg-black p-4 shadow-lg">Hello</div>
    </div>
  );
};

export default Experimental;

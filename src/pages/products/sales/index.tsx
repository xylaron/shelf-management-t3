import type { Products, Transactions_Products } from "@prisma/client";
import { type NextPage } from "next";
import Head from "next/head";
import router from "next/router";
import { useEffect, useState } from "react";
import { trpc } from "utils/trpc";

interface ProductCount {
  id: number;
  count: number;
}

const Sales: NextPage = () => {
  const [transactionsProductsList, setTransactionsProductsList] = useState<
    Transactions_Products[]
  >([]);
  const [productList, setProductList] = useState<Products[]>([]);
  const [productCount, setProductCount] = useState<ProductCount[]>([]);

  const products = trpc.products.getAll.useQuery(undefined, {
    onSuccess: (data) => {
      setProductList(data ?? []);
    },
  });
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
        <title>Products - Shelf Management App</title>
      </Head>
      <main className="flex flex-col items-center">
        <div className="container flex flex-col items-center gap-12 px-4 py-16">
          <h1 className="text-6xl font-extrabold">
            <span>Product</span> Sales
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
            <div className="flex flex-col items-center justify-center gap-8">
              <Table productCount={productCount} productList={productList} />
              <button
                className="rounded bg-red-600 py-2 px-4 font-bold transition-colors hover:bg-red-700 focus:outline-none active:bg-red-800"
                type="submit"
                hidden={productCount.length === 0}
                onClick={() => {
                  router.push("/products");
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
  productCount: ProductCount[];
  productList: Products[];
}> = ({ productCount, productList }) => {
  if (productCount.length === 0) {
    return <div className="text-xl">Loading...</div>;
  }

  const table = productCount.map((product) => {
    return (
      <tr key={product.id}>
        <td>{product.id}</td>
        <td>{productList.find((p) => p.id === product.id)?.name}</td>
        <td>{product.count}</td>
      </tr>
    );
  });

  return (
    <table>
      <thead>
        <th>ID</th>
        <th>Name</th>
        <th>Items Sold</th>
      </thead>
      <tbody>{table}</tbody>
    </table>
  );
};

export default Sales;

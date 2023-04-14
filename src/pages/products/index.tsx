import { type NextPage } from "next";
import { trpc } from "utils/trpc";
import { type Products } from "@prisma/client";
import Head from "next/head";
import { useState } from "react";
import { useRouter } from "next/router";

const Products: NextPage = () => {
  const router = useRouter();

  const [productsList, setProductsList] = useState<Products[]>([]);
  const products = trpc.products.getAll.useQuery(undefined, {
    onSuccess: (data) => {
      setProductsList(data ?? []);
    },
  });
  return (
    <>
      <Head>
        <title>Products - Shelf Management App</title>
      </Head>
      <main className="flex flex-col items-center">
        <div className="container flex flex-col items-center gap-12 px-4 py-16">
          <h1 className="text-6xl font-extrabold">
            <span>Products</span> Page
          </h1>
        </div>
        <div className="flex flex-col items-center justify-center gap-12 py-2">
          <button
            className="rounded bg-purple-700 py-2 px-4 font-bold transition-colors hover:bg-purple-800 focus:outline-none active:bg-purple-900"
            type="button"
            onClick={() => {
              router.push("/products/sales");
            }}
          >
            Past Month Sales
          </button>
          {products.isLoading ? (
            <div className="text-xl">Loading...</div>
          ) : products.isError ? (
            <div className="text-xl">Error: {products.error.message}</div>
          ) : (
            <Table productsList={productsList} />
          )}
        </div>
      </main>
    </>
  );
};

const Table: React.FC<{ productsList: Products[] }> = ({ productsList }) => {
  if (productsList.length === 0) {
    return <div className="text-xl">Loading...</div>;
  }

  const table = productsList.map((product) => {
    return (
      <tr key={product.id}>
        <td>{product.id}</td>
        <td>{product.name}</td>
        <td>{product.type}</td>
        <td>{product.price}</td>
        <td>
          {product.width}cm x {product.height}cm x {product.depth}cm
        </td>
      </tr>
    );
  });

  return (
    <table>
      <thead>
        <th>ID</th>
        <th>Name</th>
        <th>Type</th>
        <th>Price</th>
        <th>Dimensions</th>
      </thead>
      <tbody>{table}</tbody>
    </table>
  );
};

export default Products;

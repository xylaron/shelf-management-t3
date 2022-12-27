import { type NextPage } from "next";
import Head from "next/head";
import Table from "./Table";

const Products: NextPage = () => {
  return (
    <>
      <Head>
        <title>Products - Shelf Management App</title>
      </Head>
      <main className="flex min-h-screen flex-col items-center">
        <div className="container flex flex-col items-center gap-12 px-4 py-16 ">
          <h1 className="text-6xl font-extrabold text-white">
            <span className="text-purple-500">Products</span> Page
          </h1>
          <div className="flex flex-col items-center justify-center gap-12 ">
            <Table />
          </div>
        </div>
      </main>
    </>
  );
};

export default Products;

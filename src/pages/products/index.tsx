import { type NextPage } from "next";
import { trpc } from "utils/trpc";
import { type Products } from "@prisma/client";
import Head from "next/head";

const Products: NextPage = () => {
  const products = trpc.products.getAll.useQuery();
  const productList = products.data || [];
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
          {products.status == "loading" ? (
            <div className="text-xl">Loading...</div>
          ) : products.status == "error" ? (
            <div className="text-xl">Error: {products.error.message}</div>
          ) : (
            <Table productList={productList} />
          )}
        </div>
      </main>
    </>
  );
};

const Table: React.FC<{ productList: Products[] }> = ({ productList }) => {
  if (productList.length === 0) {
    return <div className="text-xl">No Products Found</div>;
  }

  const table = productList.map((product) => {
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
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Type</th>
          <th>Price</th>
          <th>Dimensions</th>
        </tr>
      </thead>
      <tbody>{table}</tbody>
    </table>
  );
};

export default Products;

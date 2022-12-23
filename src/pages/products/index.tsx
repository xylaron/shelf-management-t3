import { NextPage } from "next";
import Head from "next/head";
import { trpc } from "../../utils/trpc";

const Products: NextPage = () => {
  const products = trpc.products.getAll.useQuery();
  const productList = products.data || [];

  return (
    <>
      <Head>
        <title>Products - Shelf Management App</title>
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="tracking text-5xl font-extrabold text-white sm:text-[5rem]">
            <span className="text-purple-500">Products</span> Page
          </h1>
          <div className="flex flex-col items-center justify-center gap-12">
            {productList.length == 0 ? (
              <div>
                <div className="text-2xl text-white">No products found</div>
              </div>
            ) : (
              productList.map((product) => (
                <div
                  key={product.id}
                  className="flex flex-col items-center justify-center  "
                >
                  <p className="text-2xl text-white">
                    Product Name: {product.name}
                  </p>
                  <p className="text-2xl text-white">
                    Product Price: ${product.price}
                  </p>
                  <p className="text-2xl text-white">
                    Product Amount: {product.amount}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default Products;

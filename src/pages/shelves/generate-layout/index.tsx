import type { Products, Shelves, Transactions_Products } from "@prisma/client";
import { type NextPage } from "next";
import Head from "next/head";
import { type Dispatch, type SetStateAction, useEffect, useState } from "react";
import type { ProductCount, ShelfLayout } from "types/types";
import { trpc } from "utils/trpc";
import { type Logs, distributeProductsOnShelf } from "utils/distributeProducts";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

const GenerateLayout: NextPage = () => {
  const router = useRouter();
  //data states
  const [transactionsProductsList, setTransactionsProductsList] = useState<
    Transactions_Products[]
  >([]);
  const [productList, setProductList] = useState<Products[]>([]);
  const [productCount, setProductCount] = useState<ProductCount[]>([]);
  const [shelf, setShelf] = useState<Shelves>();
  const [shelfLayoutOutput, setShelfLayoutOutput] = useState<ShelfLayout>();
  const [shelfLayoutLogs, setShelfLayoutLogs] = useState<Logs[]>([]);

  //user input states
  const [selectedProducts, setSelectedProducts] = useState<Products[]>([]);

  //UI states
  const [isResultOpen, setIsResultOpen] = useState(false);

  const products = trpc.products.getAll.useQuery(undefined, {
    onSuccess: (data) => {
      setProductList(data ?? []);
    },
  });

  const shelfByID = trpc.shelves.getById.useQuery(
    { id: Number(router.query.id) },
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
      selectedProducts,
      shelf!
    );
    return shelfLayout;
  };

  return (
    <>
      <Head>
        <title>Generate Layout - Shelf Management App</title>
      </Head>
      <main className="flex flex-col items-center">
        <div className="container flex flex-col items-center gap-12 px-4 py-16">
          <h1 className="text-6xl font-extrabold">
            {isResultOpen ? (
              <div>
                <span>Generated</span> Layout
              </div>
            ) : (
              <div>
                <span>Select</span> Products
              </div>
            )}
          </h1>
        </div>
        <div className="flex flex-col items-center justify-center gap-12 py-2">
          {transactionsProducts.isLoading ||
          products.isLoading ||
          shelfByID.isLoading ? (
            <div className="text-xl">Loading...</div>
          ) : transactionsProducts.isError ? (
            <div className="text-xl">
              Error: {transactionsProducts.error.message}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-12 py-2">
              {isResultOpen ? (
                <OutputPlanogram
                  productList={productList}
                  shelfLayoutOutput={shelfLayoutOutput!}
                  shelfLayoutLogs={shelfLayoutLogs}
                  setIsResultOpen={setIsResultOpen}
                  setSelectedProducts={setSelectedProducts}
                />
              ) : (
                <div className="flex flex-col items-center justify-center gap-12 py-2">
                  <ShelfTable shelf={shelf!} />
                  <div className="flex flex-col items-center justify-center gap-4">
                    {shelf === undefined ? (
                      <div className="text-xl"></div>
                    ) : (
                      "Click on the products to you want to select."
                    )}
                    <ProductTable
                      productsList={productList}
                      setSelectedProducts={setSelectedProducts}
                    />
                  </div>

                  <div className="flex flex-row items-center justify-center gap-4">
                    <button
                      className="rounded bg-green-600 py-2 px-4 font-bold transition-colors hover:bg-green-700 focus:outline-none active:bg-green-800"
                      type="button"
                      hidden={shelf === undefined}
                      onClick={() => {
                        if (selectedProducts.length === 0) {
                          toast.error("Please select at least one product.");
                          return;
                        }
                        const shelfLayout = getShelfLayout();
                        setShelfLayoutOutput(shelfLayout.output);
                        setShelfLayoutLogs(shelfLayout.logs);
                        setIsResultOpen(true);
                      }}
                    >
                      Generate Layout
                    </button>
                    <button
                      className="rounded bg-red-600 py-2 px-4 font-bold transition-colors hover:bg-red-700 focus:outline-none active:bg-red-800"
                      type="button"
                      hidden={shelf === undefined}
                      onClick={() => {
                        router.push("/shelves");
                      }}
                    >
                      Back
                    </button>
                    {/* <button
                      className="rounded bg-purple-700 py-2 px-4 font-bold transition-colors hover:bg-purple-800 focus:outline-none active:bg-purple-900"
                      type="button"
                      hidden={shelf === undefined}
                      onClick={() => {
                        console.log("selectedProducts", selectedProducts);
                      }}
                    >
                      Debug
                    </button> */}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </>
  );
};

interface OutputPlanogramProps {
  productList: Products[];
  shelfLayoutOutput: ShelfLayout;
  shelfLayoutLogs: Logs[];
  setIsResultOpen: Dispatch<SetStateAction<boolean>>;
  setSelectedProducts: Dispatch<SetStateAction<Products[]>>;
}

const OutputPlanogram: React.FC<OutputPlanogramProps> = ({
  productList,
  shelfLayoutOutput,
  shelfLayoutLogs,
  setIsResultOpen,
  setSelectedProducts,
}) => {
  interface Item {
    id: number;
    depthCount: number;
  }
  const itemsList = shelfLayoutOutput.cubby.reduce((acc, curr) => {
    return [...acc, ...curr.items];
  }, [] as Item[]);

  const uniqueItemsList = itemsList
    .filter(
      (item, index) => itemsList.findIndex((i) => i.id === item.id) === index
    )
    .sort((a, b) => a.id - b.id);

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const productColors = uniqueItemsList.reduce((acc, curr) => {
    acc[curr.id] = getRandomColor();
    return acc;
  }, {} as Record<number, string>);

  //split the logs into 2 different arrays

  return (
    <div className="flex w-full flex-col items-center justify-center gap-12">
      <div>
        {shelfLayoutOutput.cubby.map((cubby, index) => (
          <div key={index} className="flex flex-col">
            <div className="bg-black px-4 py-2"></div>
            <div className="flex justify-center bg-black">
              <div className="bg-black px-2"></div>
              {cubby.items.map((item) => (
                <div
                  key={item.id}
                  className="border-x border-black px-4 py-8"
                  style={{ backgroundColor: productColors[item.id] }}
                ></div>
              ))}
              <div className="bg-black px-2"></div>
            </div>
          </div>
        ))}
        <div className="bg-black px-4 py-2"></div>
      </div>
      <div className="flex flex-col items-center justify-center gap-4">
        <table>
          <tr>
            <th className="px-4 py-2"></th>
            <th className="px-4 py-2">Product ID</th>
            <th className="px-4 py-2">Product Name</th>
            <th className="px-4 py-2">Depth Count</th>
          </tr>
          {uniqueItemsList.map((item) => {
            const product = productList.find(
              (product) => product.id === item.id
            );
            return (
              <tr key={item.id}>
                <td
                  className="px-2 py-2"
                  style={{ backgroundColor: productColors[item.id] }}
                ></td>
                <td className="px-4 py-2">{item.id}</td>
                <td className="px-4 py-2">{product?.name}</td>
                <td className="px-4 py-2">{item.depthCount}</td>
              </tr>
            );
          })}
        </table>
      </div>
      <div>
        {shelfLayoutLogs.length !== 0 && (
          <div className="font-bold text-black">
            {shelfLayoutLogs.map((log, index) => {
              if (log.type === "INFO") {
                return (
                  <div className="bg-neutral-200 p-4" key={index}>
                    {log.type} - {log.message}
                  </div>
                );
              }
            })}
          </div>
        )}
      </div>
      <div>
        {shelfLayoutLogs.length !== 0 && (
          <div className="font-bold text-black">
            {shelfLayoutLogs.map((log, index) => {
              if (log.type === "WARNING") {
                return (
                  <div className="bg-yellow-500 p-4" key={index}>
                    {log.type} - {log.message}
                  </div>
                );
              }
            })}
          </div>
        )}
      </div>
      <button
        className="rounded bg-red-600 py-2 px-4 font-bold transition-colors hover:bg-red-700 focus:outline-none active:bg-red-800"
        type="button"
        onClick={() => {
          setIsResultOpen(false);
          setSelectedProducts([]);
        }}
      >
        Back
      </button>
    </div>
  );
};

const ProductTable: React.FC<{
  productsList: Products[];
  setSelectedProducts: Dispatch<SetStateAction<Products[]>>;
}> = ({ productsList, setSelectedProducts }) => {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  if (productsList.length === 0) {
    return <div className="text-xl">Loading...</div>;
  }

  const toggleRow = (index: number) => {
    const isSelected = selectedRows.includes(index);
    setSelectedRows(
      isSelected
        ? selectedRows.filter((rowIndex) => rowIndex !== index)
        : [...selectedRows, index]
    );
  };

  const table = productsList.map((product, index) => {
    return (
      <tr
        key={product.id}
        onClick={() => {
          setSelectedProducts((prev) => {
            if (prev.includes(product)) {
              return prev.filter((p) => p.id !== product.id);
            }
            return [...prev, product];
          });
          toggleRow(index);
        }}
        className={selectedRows.includes(index) ? "bg-purple-800" : ""}
      >
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

const ShelfTable: React.FC<{
  shelf: Shelves;
}> = ({ shelf }) => {
  if (shelf === undefined) {
    return <div className="text-xl">Loading...</div>;
  }
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Dimensions</th>
          <th>Weight Capacity</th>
          <th>Cubbyhole Count</th>
          <th>Divider Height</th>
        </tr>
      </thead>
      <tbody>
        <tr key={shelf.id}>
          <td>{shelf.name}</td>
          <td>
            {shelf.width}cm x {shelf.height}cm x {shelf.depth}cm
          </td>
          <td>{shelf.weight_capacity}kg</td>
          <td>{shelf.cubbyhole_count}</td>
          <td>{shelf.divider_height}cm</td>
        </tr>
      </tbody>
    </table>
  );
};

export default GenerateLayout;

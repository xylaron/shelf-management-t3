import { type NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { Layouts, Products } from "@prisma/client";
import { trpc } from "utils/trpc";
import { useState } from "react";
import { ShelfLayout } from "types/types";
import { Logs } from "utils/distributeProducts";
import OutputPlanogram from "components/OutputPlanogram";

const LayoutsView: NextPage = () => {
  const router = useRouter();

  const [productList, setProductList] = useState<Products[]>([]);
  const [shelfLayoutOutput, setShelfLayoutOutput] = useState<ShelfLayout>();
  const [shelfLayoutLogs, setShelfLayoutLogs] = useState<Logs[]>([]);
  const [layoutName, setLayoutName] = useState<string>("");

  const layouts = trpc.layouts.getById.useQuery(
    {
      id: Number(router.query.id),
    },
    {
      onSuccess: (data) => {
        const parsedJSON = JSON.parse(data!.layout);
        setLayoutName(data!.name);
        setShelfLayoutOutput(parsedJSON.output);
        setShelfLayoutLogs(parsedJSON.logs);
      },
    }
  );

  const products = trpc.products.getAll.useQuery(undefined, {
    onSuccess: (data) => {
      setProductList(data ?? []);
    },
  });

  return (
    <>
      <Head>
        <title>Layouts - Shelf Management App</title>
      </Head>
      <main className="flex flex-col items-center">
        <div className="container flex flex-col items-center gap-12 px-4 py-16">
          <h1 className="tracking text-6xl font-extrabold">
            <span>Layout</span> View
          </h1>
        </div>
        <div className="flex flex-col items-center justify-center gap-12 py-2">
          <div className="">
            {layouts.isLoading && products.isLoading ? (
              <div className="text-xl">Loading...</div>
            ) : layouts.isError ? (
              <div className="text-xl">Error: {layouts.error.message}</div>
            ) : (
              <div>
                {shelfLayoutOutput && shelfLayoutLogs && productList && (
                  <div className="flex flex-col items-center justify-center gap-8">
                    <h1 className="text-2xl font-bold">Layout: {layoutName}</h1>
                    <OutputPlanogram
                      productList={productList}
                      shelfLayoutOutput={shelfLayoutOutput!}
                      shelfLayoutLogs={shelfLayoutLogs}
                    />
                    <button
                      className="mx-1 rounded bg-red-600 py-2 px-4 font-bold transition-colors hover:bg-red-700 focus:outline-none active:bg-red-800"
                      onClick={() => router.push("/layouts")}
                    >
                      Back
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default LayoutsView;

import { type NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import { generateNames } from "utils/generateData";

const Experimental: NextPage = () => {
  const [nameList, setNameList] = useState<string[]>([]);

  useEffect(() => {
    const names = generateNames();
    setNameList(names);
  }, []);

  return (
    <>
      <Head>
        <title>Experimental - Shelf Management App</title>
      </Head>
      <main className="flex min-h-screen flex-col items-center">
        <div className="container flex flex-col items-center gap-12 px-4 pt-16 pb-8">
          <h1 className="tracking text-6xl font-extrabold text-white">
            <span className="text-purple-500">Experimental</span> Page
          </h1>
        </div>
        <div className="flex flex-col gap-4 pt-8 pb-16">
          {nameList.map((name, index) => (
            <div key={index} className="text-white">
              {index + 1}. {name}
            </div>
          ))}
        </div>
      </main>
    </>
  );
};

export default Experimental;

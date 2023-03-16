import { faker } from "@faker-js/faker";
import { type NextPage } from "next";
import Head from "next/head";
import { useState } from "react";

const Experimental: NextPage = () => {
  const [number, setNumber] = useState<number>(727);

  return (
    <>
      <Head>
        <title>Experimental - Shelf Management App</title>
      </Head>
      <main className="flex flex-col items-center">
        <div className="container flex flex-col items-center gap-12 px-4 pt-16 pb-8">
          <h1 className="tracking text-6xl font-extrabold text-white">
            <span>Experimental</span> Page
          </h1>
        </div>
        <div className="flex flex-col gap-4 pt-8 pb-16">
          <button
            className="rounded-lg border border-white bg-purple-900 p-2 font-bold hover:bg-purple-900/80 active:scale-95 active:bg-purple-900/60"
            onClick={() => setNumber(faker.datatype.number(1000))}
          >
            Generate Number
          </button>
          <div>{number === 727 ? "WYSI" : number}</div>
        </div>
      </main>
    </>
  );
};

export default Experimental;

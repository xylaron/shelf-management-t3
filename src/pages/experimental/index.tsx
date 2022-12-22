import { NextPage } from "next";
import Head from "next/head";

const Experimental: NextPage = () => {
  return (
    <>
      <Head>
        <title>Experimental - Shelf Management App</title>
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="tracking text-5xl font-extrabold text-white sm:text-[5rem]">
            <span className="text-purple-500">Experimental</span> Page
          </h1>
        </div>
      </main>
    </>
  );
};

export default Experimental;

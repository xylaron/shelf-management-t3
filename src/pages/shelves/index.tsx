import { type NextPage } from "next";
import Head from "next/head";

const Shelves: NextPage = () => {
  return (
    <>
      <Head>
        <title>Shelves - Shelf Management App</title>
      </Head>
      <main className="flex flex-col items-center">
        <div className="container flex flex-col items-center gap-12 px-4 py-16">
          <h1 className="tracking text-6xl font-extrabold">
            <span>Shelves</span> Page
          </h1>
        </div>
        <div className="flex flex-col items-center justify-center gap-12 py-2">
          <div>Test</div>
        </div>
      </main>
    </>
  );
};

export default Shelves;

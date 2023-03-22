import { type NextPage } from "next";
import Head from "next/head";
import ExampleQuery from "components/ExampleQuery";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Home - Shelf Management App</title>
      </Head>
      <main className="flex flex-col items-center justify-center">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-6xl font-extrabold text-white">
            <span>Home</span> Page
          </h1>
          <ExampleQuery />
        </div>
      </main>
    </>
  );
};

export default Home;

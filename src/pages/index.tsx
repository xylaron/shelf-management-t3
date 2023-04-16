import { type NextPage } from "next";
import Head from "next/head";

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
          <div className="text-3xl font-bold">
            Welcome to the Shelf Management App!
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;

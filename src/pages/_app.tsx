import { type AppType } from "next/app";
import { trpc } from "utils/trpc";
import Head from "next/head";
import "styles/globals.css";
import Navbar from "components/Navbar";
import { useState } from "react";
import Login from "components/Login";
import { Toaster } from "react-hot-toast";

const MyApp: AppType = ({ Component, pageProps }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
          rel="stylesheet"
        />
      </Head>
      {isAuthenticated ? (
        <div>
          <Toaster />
          <Navbar />
          <Component {...pageProps} />
        </div>
      ) : (
        <Login setIsAuthenticated={setIsAuthenticated} />
      )}
    </>
  );
};

export default trpc.withTRPC(MyApp);

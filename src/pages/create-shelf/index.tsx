import { type NextPage } from "next";
import { useState } from "react";
import Head from "next/head";

const CreateShelf: NextPage = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };
  return (
    <>
      <Head>
        <title>Create Shelf - Shelf Management App</title>
      </Head>
      <main className="flex flex-col items-center">
        <div className="container flex flex-col items-center gap-12 px-4 py-16">
          <h1 className="tracking text-6xl font-extrabold">
            Create <span>Shelf</span> Page
          </h1>
        </div>
        <div className="flex flex-col items-center justify-center py-2">
          <form
            onSubmit={handleSubmit}
            className="rounded-lg bg-neutral-800 p-6 shadow-md"
          >
            <div className="mb-4">
              <label className="mb-2 block font-bold " htmlFor="width">
                Width {"(cm)"}
              </label>
              <input
                className="w-full rounded border py-2 px-3 leading-tight text-black focus:outline-none"
                id="width"
                type="number"
                step="0.01"
                placeholder="Width"
                required
              />
            </div>
            <div className="mb-4">
              <label className="mb-2 block font-bold " htmlFor="height">
                Height {"(cm)"}
              </label>
              <input
                className="w-full rounded border py-2 px-3 leading-tight  text-black focus:outline-none"
                id="height"
                type="number"
                step="0.01"
                placeholder="Height"
                required
              />
            </div>
            <div className="mb-4">
              <label className="mb-2 block font-bold " htmlFor="depth">
                Depth {"(cm)"}
              </label>
              <input
                className="w-full rounded border py-2 px-3 leading-tight  text-black focus:outline-none"
                id="depth"
                type="number"
                step="0.01"
                placeholder="Depth"
                required
              />
            </div>
            <button
              className="rounded bg-purple-900 py-2 px-4 font-bold hover:bg-purple-700 focus:outline-none"
              type="submit"
            >
              Optimize Shelves
            </button>
          </form>
        </div>
      </main>
    </>
  );
};

export default CreateShelf;

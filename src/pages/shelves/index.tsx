import { type NextPage } from "next";
import Head from "next/head";
import router from "next/router";
import { type Shelves } from "@prisma/client";
import { trpc } from "utils/trpc";
import { useState } from "react";

const Shelves: NextPage = () => {
  const shelves = trpc.shelves.getAll.useQuery();
  const shelvesList = shelves.data || [];
  const [selectedPage, setSelectedPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

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
        <div className="flex flex-col items-center justify-center gap-6 py-2">
          <button
            className="flex flex-col gap-2 rounded bg-purple-700 py-2 px-4 font-bold transition-colors hover:bg-purple-800 focus:outline-none active:bg-purple-900"
            type="submit"
            onClick={() => {
              router.push("/shelves/create-shelf");
            }}
          >
            Create New Shelf
          </button>
          <div className="flex flex-row gap-4">
            <div className="flex flex-col gap-2">
              <label>Page Size</label>
              <select
                className="h-6 w-16 px-2 text-black"
                value={pageSize}
                onChange={(e) => setPageSize(parseInt(e.target.value))}
              >
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label>Page</label>
              <input
                className="h-6 w-16 px-2 text-black"
                type="number"
                value={selectedPage}
                onChange={(e) => setSelectedPage(parseInt(e.target.value))}
              ></input>
            </div>
          </div>
          <div>
            {shelves.status == "loading" ? (
              <div className="text-xl">Loading...</div>
            ) : shelves.status == "error" ? (
              <div className="text-xl">Error: {shelves.error.message}</div>)
            : (
              <Table shelvesList={shelvesList}></Table>
            )}
          </div>
        </div>
      </main>
    </>
  );
};

const Table: React.FC<{ shelvesList: Shelves[] }> = ({ shelvesList }) => {
  if (shelvesList.length === 0) {
    return <div className="text-xl">No Shelves Found</div>;
  }

  const table = shelvesList.map((shelves) => {
    return (
      <tr key={shelves.id}>
        <td>{shelves.id}</td>
        <td>{shelves.name}</td>
        <td>
          {shelves.width}cm x {shelves.height}cm x {shelves.depth}cm
        </td>
        <td>{shelves.weight_capacity}kg</td>
        <td>{shelves.created_at.toUTCString()}</td>
      </tr>
    );
  });

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Dimensions</th>
          <th>Weight Capacity</th>
          <th>Created At</th>
        </tr>
      </thead>
      <tbody>{table}</tbody>
    </table>
  );
};

export default Shelves;

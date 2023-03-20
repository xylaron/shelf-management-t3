import { type NextPage } from "next";
import Head from "next/head";
import router from "next/router";
import { type Shelves } from "@prisma/client";
import { trpc } from "utils/trpc";
import { useState } from "react";

const Shelves: NextPage = () => {
  const shelves = trpc.shelves.getAll.useQuery(undefined, {
    onSuccess: (data) => {
      data.sort((a, b) => a.id - b.id);
      setShelvesList(data ?? []);
    },
  });

  // const [selectedPage, setSelectedPage] = useState(1);
  // const [pageSize, setPageSize] = useState(10);
  const [shelvesList, setShelvesList] = useState<Shelves[]>([]);

  const deleteShelf = trpc.shelves.delete.useMutation({
    onSuccess: () => {
      void shelves.refetch();
    },
  });

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this shelf?")) {
      deleteShelf.mutate({
        id: id,
      });
    }
  };

  const handleEdit = (shelvesList: Shelves[], queryId: number) => {
    router.push({
      pathname: "/shelves/edit-shelf",
      query: {
        id: queryId,
        name: shelvesList.find((shelves) => shelves.id == queryId)?.name,
        width: shelvesList.find((shelves) => shelves.id == queryId)?.width,
        height: shelvesList.find((shelves) => shelves.id == queryId)?.height,
        depth: shelvesList.find((shelves) => shelves.id == queryId)?.depth,
        weight_capacity: shelvesList.find((shelves) => shelves.id == queryId)
          ?.weight_capacity,
      },
    });
  };

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
          <button
            className="rounded bg-green-600 py-2 px-4 font-bold transition-colors hover:bg-green-700 focus:outline-none active:bg-green-800"
            type="submit"
            onClick={() => {
              router.push("/shelves/create-shelf");
            }}
          >
            Create New Shelf
          </button>
          {/* <div className="flex flex-row gap-4">
            <div className="flex flex-col gap-2">
              <label>Page Size</label>
              <select
                className="h-8 w-16 rounded bg-neutral-700 px-2 py-1"
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
                className="h-8 w-16 rounded bg-neutral-700 px-3 py-1"
                type="number"
                value={selectedPage}
                onChange={(e) => {
                  if (e.target.value == "0") e.target.value = "1";
                  setSelectedPage(parseInt(e.target.value));
                }}
              ></input>
            </div>
          </div> */}
          <div className="">
            {shelves.status == "loading" ? (
              <div className="text-xl">Loading...</div>
            ) : shelves.status == "error" ? (
              <div className="text-xl">Error: {shelves.error.message}</div>
            ) : (
              <Table
                shelvesList={shelvesList}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
              ></Table>
            )}
          </div>
        </div>
      </main>
    </>
  );
};

const Table: React.FC<{
  shelvesList: Shelves[];
  handleDelete(id: number): void;
  handleEdit(shelfData: Shelves[], queryId: number): void;
}> = ({ shelvesList, handleDelete, handleEdit }) => {
  if (shelvesList.length === 0) {
    return <div className="text-xl">No Shelves Found</div>;
  }

  const table = shelvesList.map((shelves) => {
    return (
      <tr key={shelves.id}>
        <td>{shelves.name}</td>
        <td>
          {shelves.width}cm x {shelves.height}cm x {shelves.depth}cm
        </td>
        <td>{shelves.weight_capacity}kg</td>
        <td>
          {shelves.created_at.toLocaleString("en-UK", {
            timeZone: "Asia/Hong_Kong",
          })}
        </td>
        <td>
          <button
            className="mr-1 rounded bg-blue-600 py-2 px-4 font-bold transition-colors hover:bg-blue-700 focus:outline-none active:bg-blue-800"
            onClick={() => handleEdit(shelvesList, shelves.id)}
          >
            Edit
          </button>
          <button
            className="ml-1 rounded bg-red-600 py-2 px-4 font-bold transition-colors hover:bg-red-700 focus:outline-none active:bg-red-800"
            onClick={() => handleDelete(shelves.id)}
          >
            Delete
          </button>
        </td>
      </tr>
    );
  });

  return (
    <table>
      <thead>
        <th>Name</th>
        <th>Dimensions</th>
        <th>Weight Capacity</th>
        <th>Created At</th>
        <th>Actions</th>
      </thead>
      <tbody>{table}</tbody>
    </table>
  );
};

export default Shelves;

import { type NextPage } from "next";
import Head from "next/head";
import router from "next/router";
import { type Layouts } from "@prisma/client";
import { trpc } from "utils/trpc";
import { useState } from "react";
import toast from "react-hot-toast";

const Layouts: NextPage = () => {
  const layouts = trpc.layouts.getAll.useQuery(undefined, {
    onSuccess: (data) => {
      setLayoutsList(data ?? []);
    },
  });

  const [layoutsList, setLayoutsList] = useState<Layouts[]>([]);

  const deleteLayout = trpc.layouts.delete.useMutation({
    onSuccess: () => {
      void layouts.refetch();
      toast.success("Layout deleted successfully");
    },
  });

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this layout?")) {
      deleteLayout.mutate({
        id: id,
      });
    }
  };

  return (
    <>
      <Head>
        <title>Layouts - Shelf Management App</title>
      </Head>
      <main className="flex flex-col items-center">
        <div className="container flex flex-col items-center gap-12 px-4 py-16">
          <h1 className="tracking text-6xl font-extrabold">
            <span>Layouts</span> Page
          </h1>
        </div>
        <div className="flex flex-col items-center justify-center gap-12 py-2">
          <button
            className="rounded bg-green-600 py-2 px-4 font-bold transition-colors hover:bg-green-700 focus:outline-none active:bg-green-800"
            type="submit"
            onClick={() => {
              router.push("/shelves");
            }}
          >
            Create New Layout
          </button>
          <div className="">
            {layouts.isLoading ? (
              <div className="text-xl">Loading...</div>
            ) : layouts.isError ? (
              <div className="text-xl">Error: {layouts.error.message}</div>
            ) : (
              <div>
                <Table layoutsList={layoutsList} handleDelete={handleDelete} />
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
};

const Table: React.FC<{
  layoutsList: Layouts[];
  handleDelete(id: number): void;
}> = ({ layoutsList, handleDelete }) => {
  if (layoutsList.length === 0) {
    return <div className="text-xl">No Layouts Found</div>;
  }

  const table = layoutsList.map((layouts) => {
    return (
      <tr key={layouts.id}>
        <td>{layouts.name}</td>
        <td>
          {layouts.created_at.toLocaleString("en-UK", {
            timeZone: "Asia/Hong_Kong",
          })}
        </td>
        <td>
          <button
            className="mx-1 rounded bg-blue-600 py-2 px-4 font-bold transition-colors hover:bg-blue-700 focus:outline-none active:bg-blue-800"
            onClick={() => {
              router.push({
                pathname: "/layouts/view",
                query: { id: layouts.id },
              });
            }}
          >
            View
          </button>
          <button
            className="mx-1 rounded bg-red-600 py-2 px-4 font-bold transition-colors hover:bg-red-700 focus:outline-none active:bg-red-800"
            onClick={() => handleDelete(layouts.id)}
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
        <th>Created At</th>
        <th>Actions</th>
      </thead>
      <tbody>{table}</tbody>
    </table>
  );
};

export default Layouts;

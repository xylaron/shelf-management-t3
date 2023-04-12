import { type NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import toast from "react-hot-toast";
import { trpc } from "utils/trpc";

const EditShelf: NextPage = () => {
  const router = useRouter();

  const [name, setName] = useState(router.query.name as string);
  const [width, setWidth] = useState(Number(router.query.width));
  const [height, setHeight] = useState(Number(router.query.height));
  const [depth, setDepth] = useState(Number(router.query.depth));
  const [weight_capacity, setWeightCapacity] = useState(
    Number(router.query.weight_capacity)
  );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    editShelf.mutate({
      id: Number(router.query.id),
      name: name,
      width: width,
      height: height,
      depth: depth,
      weight_capacity: weight_capacity,
    });
  };

  const editShelf = trpc.shelves.edit.useMutation({
    onSuccess: () => {
      router.push("/shelves");
      toast.success("Shelf edited successfully");
    },
  });

  const preventNonNumberInput = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.code === "Minus" || event.code === "KeyE") {
      event.preventDefault();
    }
  };

  const preventScroll = (event: React.WheelEvent<HTMLInputElement>) => {
    event.currentTarget.blur();
  };

  const preventCutCopyPaste = (
    event: React.ClipboardEvent<HTMLInputElement>
  ) => {
    event.preventDefault();
  };

  return (
    <>
      <Head>
        <title>Edit Shelf - Shelf Management App</title>
      </Head>
      <main className="flex flex-col items-center">
        <div className="container flex flex-col items-center gap-12 px-4 py-16">
          <h1 className="tracking text-6xl font-extrabold">
            Edit <span>Shelf</span>
          </h1>
        </div>
        <div className="flex flex-row items-center justify-center py-2">
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-3 gap-2 rounded-lg bg-neutral-800 p-6 shadow-md"
          >
            <div className="mb-4">
              <label className="mb-2 block font-bold" htmlFor="name">
                Name
              </label>
              <input
                className="w-full rounded  bg-neutral-700 py-2 px-3"
                id="name"
                type="text"
                placeholder="Name"
                maxLength={20}
                defaultValue={router.query.name}
                disabled={editShelf.isLoading}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="mb-2 block font-bold" htmlFor="weight_capacity">
                Weight Capacity {"(kg)"}
              </label>
              <input
                className="w-full rounded  bg-neutral-700 py-2 px-3"
                id="weight_capacity"
                type="number"
                placeholder="Weight Capacity"
                onKeyDown={preventNonNumberInput}
                onWheel={preventScroll}
                defaultValue={router.query.weight_capacity}
                disabled={editShelf.isLoading}
                onChange={(e) => setWeightCapacity(Number(e.target.value))}
                onCut={preventCutCopyPaste}
                onCopy={preventCutCopyPaste}
                onPaste={preventCutCopyPaste}
                required
              />
            </div>
            <div></div>
            <div className="mb-4">
              <label className="mb-2 block font-bold" htmlFor="width">
                Width {"(cm)"}
              </label>
              <input
                className="w-full rounded  bg-neutral-700 py-2 px-3"
                id="width"
                type="number"
                placeholder="Width"
                onKeyDown={preventNonNumberInput}
                onWheel={preventScroll}
                defaultValue={router.query.width}
                disabled={editShelf.isLoading}
                onChange={(e) => setWidth(Number(e.target.value))}
                onCut={preventCutCopyPaste}
                onCopy={preventCutCopyPaste}
                onPaste={preventCutCopyPaste}
                required
              />
            </div>
            <div className="mb-4">
              <label className="mb-2 block font-bold" htmlFor="height">
                Height {"(cm)"}
              </label>
              <input
                className="w-full rounded  bg-neutral-700 py-2 px-3"
                id="height"
                type="number"
                placeholder="Height"
                onKeyDown={preventNonNumberInput}
                onWheel={preventScroll}
                defaultValue={router.query.height}
                disabled={editShelf.isLoading}
                onChange={(e) => setHeight(Number(e.target.value))}
                onCut={preventCutCopyPaste}
                onCopy={preventCutCopyPaste}
                onPaste={preventCutCopyPaste}
                required
              />
            </div>
            <div className="mb-4">
              <label className="mb-2 block font-bold" htmlFor="depth">
                Depth {"(cm)"}
              </label>
              <input
                className="w-full rounded  bg-neutral-700 py-2 px-3"
                id="depth"
                type="number"
                placeholder="Depth"
                onKeyDown={preventNonNumberInput}
                onWheel={preventScroll}
                defaultValue={router.query.depth}
                disabled={editShelf.isLoading}
                onChange={(e) => setDepth(Number(e.target.value))}
                onCut={preventCutCopyPaste}
                onCopy={preventCutCopyPaste}
                onPaste={preventCutCopyPaste}
                required
              />
            </div>
            <div>
              <button
                className="rounded bg-green-600 py-2 px-4 font-bold transition-colors hover:bg-green-700 active:bg-green-800 disabled:bg-green-800"
                type="submit"
                disabled={editShelf.isLoading}
              >
                Save
              </button>
            </div>
            <div>
              <button
                className="rounded bg-red-600 py-2 px-4 font-bold transition-colors hover:bg-red-700 active:bg-red-800 disabled:bg-red-800"
                onClick={() => router.push("/shelves")}
                disabled={editShelf.isLoading}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
};

export default EditShelf;

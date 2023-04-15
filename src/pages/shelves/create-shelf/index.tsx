import { type NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { trpc } from "utils/trpc";
import { useState } from "react";
import { toast } from "react-hot-toast";

const CreateShelf: NextPage = () => {
  const router = useRouter();

  const [name, setName] = useState("");
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [depth, setDepth] = useState(0);
  const [weight_capacity, setWeightCapacity] = useState(0);
  const [cubbyhole_count, setCubbyholeCount] = useState(0);
  const [divider_height, setDividerHeight] = useState(0);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    createShelf.mutate({
      name: name,
      width: width,
      height: height,
      depth: depth,
      weight_capacity: weight_capacity,
      cubbyhole_count: cubbyhole_count,
      divider_height: divider_height,
    });
  };

  const createShelf = trpc.shelves.create.useMutation({
    onSuccess: () => {
      router.push("/shelves");
      toast.success("Shelf created successfully");
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
        <title>Create New Shelf - Shelf Management App</title>
      </Head>
      <main className="flex flex-col items-center">
        <div className="container flex flex-col items-center gap-12 px-4 py-16">
          <h1 className="tracking text-6xl font-extrabold">
            Create New <span>Shelf</span>
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
                disabled={createShelf.isLoading}
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
                disabled={createShelf.isLoading}
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
                disabled={createShelf.isLoading}
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
                disabled={createShelf.isLoading}
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
                disabled={createShelf.isLoading}
                onChange={(e) => setDepth(Number(e.target.value))}
                onCut={preventCutCopyPaste}
                onCopy={preventCutCopyPaste}
                onPaste={preventCutCopyPaste}
                required
              />
            </div>
            <div className="mb-4">
              <label className="mb-2 block font-bold" htmlFor="depth">
                Cubbyhole Count
              </label>
              <input
                className="w-full rounded  bg-neutral-700 py-2 px-3"
                id="depth"
                type="number"
                placeholder="Cubbyhole Count"
                onKeyDown={preventNonNumberInput}
                onWheel={preventScroll}
                disabled={createShelf.isLoading}
                onChange={(e) => setCubbyholeCount(Number(e.target.value))}
                onCut={preventCutCopyPaste}
                onCopy={preventCutCopyPaste}
                onPaste={preventCutCopyPaste}
                required
              />
            </div>
            <div className="mb-4">
              <label className="mb-2 block font-bold" htmlFor="depth">
                Divider Height {"(cm)"}
              </label>
              <input
                className="w-full rounded  bg-neutral-700 py-2 px-3"
                id="depth"
                type="number"
                placeholder="Divider Height"
                onKeyDown={preventNonNumberInput}
                onWheel={preventScroll}
                disabled={createShelf.isLoading}
                onChange={(e) => setDividerHeight(Number(e.target.value))}
                onCut={preventCutCopyPaste}
                onCopy={preventCutCopyPaste}
                onPaste={preventCutCopyPaste}
                required
              />
            </div>
            <div></div>
            <div>
              <button
                className="rounded bg-green-600 py-2 px-4 font-bold transition-colors hover:bg-green-700 active:bg-green-800 disabled:bg-green-800"
                type="submit"
                disabled={createShelf.isLoading}
              >
                Create
              </button>
            </div>
            <div>
              <button
                className="rounded bg-red-600 py-2 px-4 font-bold transition-colors hover:bg-red-700 active:bg-red-800 disabled:bg-red-800"
                onClick={() => router.push("/shelves")}
                disabled={createShelf.isLoading}
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

export default CreateShelf;

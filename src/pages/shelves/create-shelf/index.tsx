import { type NextPage } from "next";
import Head from "next/head";
import router from "next/router";
import { trpc } from "utils/trpc";

const CreateShelf: NextPage = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const target = event.target as typeof event.target & {
      name: { value: string };
      width: { value: number };
      height: { value: number };
      depth: { value: number };
      weight_capacity: { value: number };
    };

    const name = target.name.value;
    const width = Number(target.width.value);
    const height = Number(target.height.value);
    const depth = Number(target.depth.value);
    const weight_capacity = Number(target.weight_capacity.value);

    createShelf.mutate({
      name: name,
      width: width,
      height: height,
      depth: depth,
      weight_capacity: weight_capacity,
    });
  };

  const createShelf = trpc.shelves.create.useMutation({
    onSuccess: () => {
      router.push("/shelves");
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
                required
              />
            </div>
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

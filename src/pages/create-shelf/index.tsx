import { type NextPage } from "next";
import Head from "next/head";
import router from "next/router";

const CreateShelf: NextPage = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const target = event.target as typeof event.target & {
      name: { value: string };
      width: { value: string };
      height: { value: string };
      depth: { value: string };
    };

    const name = target.name.value;
    const width = target.width.value;
    const height = target.height.value;
    const depth = target.depth.value;

    router.push("/shelves");
  };

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
                className="w-full rounded border py-2 px-3 text-black focus:outline-none"
                id="name"
                type="text"
                placeholder="Name"
                maxLength={20}
                required
              />
            </div>
            <div className="mb-4">
              <label className="mb-2 block font-bold" htmlFor="weight-capacity">
                Weight Capacity {"(kg)"}
              </label>
              <input
                className="w-full rounded border py-2 px-3 text-black focus:outline-none"
                id="weight-capacity"
                type="number"
                placeholder="Weight Capacity"
                onKeyPress={preventNonNumberInput}
                onWheel={preventScroll}
                required
              />
            </div>
            <div></div>
            <div className="mb-4">
              <label className="mb-2 block font-bold" htmlFor="width">
                Width {"(cm)"}
              </label>
              <input
                className="w-full rounded border py-2 px-3 text-black focus:outline-none"
                id="width"
                type="number"
                placeholder="Width"
                onKeyPress={preventNonNumberInput}
                onWheel={preventScroll}
                required
              />
            </div>
            <div className="mb-4">
              <label className="mb-2 block font-bold" htmlFor="height">
                Height {"(cm)"}
              </label>
              <input
                className="w-full rounded border py-2 px-3 text-black focus:outline-none"
                id="height"
                type="number"
                placeholder="Height"
                onKeyPress={preventNonNumberInput}
                onWheel={preventScroll}
                required
              />
            </div>
            <div className="mb-4">
              <label className="mb-2 block font-bold" htmlFor="depth">
                Depth {"(cm)"}
              </label>
              <input
                className="w-full rounded border py-2 px-3 text-black focus:outline-none"
                id="depth"
                type="number"
                placeholder="Depth"
                onKeyPress={preventNonNumberInput}
                onWheel={preventScroll}
                required
              />
            </div>
            <div>
              <button
                className="rounded bg-purple-900 py-2 px-4 font-bold transition-colors hover:bg-purple-800 focus:outline-none active:bg-purple-700"
                type="submit"
              >
                Add
              </button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
};

export default CreateShelf;

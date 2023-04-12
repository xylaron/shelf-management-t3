import { Dispatch, SetStateAction, useState } from "react";
import { trpc } from "utils/trpc";
import { useRouter } from "next/router";
import Head from "next/head";

const Login: React.FC<{
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
}> = ({ setIsAuthenticated }) => {
  const router = useRouter();
  const [passwordAlert, setPasswordAlert] = useState(false);
  const user = trpc.users.getAll.useQuery();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const target = event.target as typeof event.target & {
      password: { value: string };
    };

    const password = target.password.value;

    if (password === user.data![0]!.password) {
      setIsAuthenticated(true);
      router.push("/");
    } else {
      setPasswordAlert(true);
    }
    target.password.value = "";
  };

  return (
    <>
      <Head>
        <title>Login - Shelf Management App</title>
      </Head>
      <main className="flex flex-col items-center justify-center">
        {user.isLoading ? (
          <div className="text-xl">Loading...</div>
        ) : user.isError ? (
          <div className="text-xl">Error: {user.error.message}</div>
        ) : (
          <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
            <h1 className="text-6xl font-extrabold text-white">
              <span>Login</span> Page
            </h1>
            <div>
              <form onSubmit={handleSubmit}>
                <div className="flex flex-row gap-4">
                  <input
                    className="rounded bg-neutral-700 px-4 py-2"
                    id="password"
                    type="password"
                  />
                  <button
                    className="rounded bg-purple-700 py-2 px-4 font-bold transition-colors hover:bg-purple-800 active:bg-purple-900"
                    type="submit"
                  >
                    Login
                  </button>
                </div>
              </form>
              <div className="mt-4 text-center font-bold">
                {passwordAlert && (
                  <div className="text-red-500">Incorrect password</div>
                )}
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
};

export default Login;

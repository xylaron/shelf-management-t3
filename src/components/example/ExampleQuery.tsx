import { trpc } from "utils/trpc";

const ExampleQuery: React.FC = () => {
  const hello = trpc.example.hello.useQuery({ text: "from tRPC" });
  return (
    <div className="flex flex-col items-center gap-2">
      <p className="text-lg text-white">
        {/* Message obtained from tRPC */}
        Example Message from tRPC query:{" "}
        {hello.data ? hello.data.greeting : "Loading tRPC query..."}
      </p>
    </div>
  );
};

export default ExampleQuery;

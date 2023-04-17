import type { Products } from "@prisma/client";
import type { ShelfLayout } from "types/types";
import type { Logs } from "utils/distributeProducts";

interface OutputPlanogramProps {
  productList: Products[];
  shelfLayoutOutput: ShelfLayout;
  shelfLayoutLogs: Logs[];
}

const OutputPlanogram: React.FC<OutputPlanogramProps> = ({
  productList,
  shelfLayoutOutput,
  shelfLayoutLogs,
}) => {
  interface Item {
    id: number;
    depthCount: number;
  }

  console.log("check: ", shelfLayoutOutput);
  const itemsList = shelfLayoutOutput.cubby.reduce((acc, curr) => {
    return [...acc, ...curr.items];
  }, [] as Item[]);

  const uniqueItemsList = itemsList
    .filter(
      (item, index) => itemsList.findIndex((i) => i.id === item.id) === index
    )
    .sort((a, b) => a.id - b.id);

  const getRandomColor = (index: number, total: number) => {
    const hue = Math.floor((index / total) * 360);
    const saturation = 100;
    const lightness = 50;

    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  };

  const productColors = uniqueItemsList.reduce((acc, curr, index) => {
    acc[curr.id] = getRandomColor(index, uniqueItemsList.length);
    return acc;
  }, {} as Record<number, string>);

  //split the logs into 2 different arrays

  return (
    <div className="flex w-full flex-col items-center justify-center gap-12">
      <div>
        {shelfLayoutOutput.cubby.map((cubby, index) => (
          <div key={index} className="flex flex-col">
            <div className="bg-black px-4 py-2"></div>
            <div className="flex justify-center bg-black">
              <div className="bg-black px-2"></div>
              {cubby.items.map((item) => (
                <div
                  key={item.id}
                  className="border-x border-black px-2 py-8"
                  style={{ backgroundColor: productColors[item.id] }}
                >
                  <div className="text-center font-bold text-black">
                    {item.id}
                  </div>
                </div>
              ))}
              <div className="bg-black px-2"></div>
            </div>
          </div>
        ))}
        <div className="bg-black px-4 py-2"></div>
      </div>
      <div className="flex flex-col items-center justify-center gap-4">
        <table>
          <tr>
            <th className="px-4 py-2"></th>
            <th className="px-4 py-2">Product ID</th>
            <th className="px-4 py-2">Product Name</th>
            <th className="px-4 py-2">Depth Count</th>
          </tr>
          {uniqueItemsList.map((item) => {
            const product = productList.find(
              (product) => product.id === item.id
            );
            return (
              <tr key={item.id}>
                <td
                  className="px-2 py-2"
                  style={{ backgroundColor: productColors[item.id] }}
                ></td>
                <td className="px-4 py-2">{item.id}</td>
                <td className="px-4 py-2">{product?.name}</td>
                <td className="px-4 py-2">{item.depthCount}</td>
              </tr>
            );
          })}
        </table>
      </div>
      <div>
        {shelfLayoutLogs.length !== 0 && (
          <div className="font-bold text-black">
            {shelfLayoutLogs.map((log, index) => {
              if (log.type === "INFO") {
                return (
                  <div className="bg-neutral-200 p-4" key={index}>
                    {log.type} - {log.message}
                  </div>
                );
              }
            })}
          </div>
        )}
      </div>
      <div>
        {shelfLayoutLogs.length !== 0 && (
          <div className="font-bold text-black">
            {shelfLayoutLogs.map((log, index) => {
              if (log.type === "WARNING") {
                return (
                  <div className="bg-yellow-500 p-4" key={index}>
                    {log.type} - {log.message}
                  </div>
                );
              }
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default OutputPlanogram;

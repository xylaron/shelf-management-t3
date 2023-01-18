import { type Transactions } from "@prisma/client";
import { sampleProducts } from "utils/sampleProducts";

//prettier-ignore
const Table: React.FC<{ transactionsList: Transactions[] }> = ({ transactionsList }) => {
  if (transactionsList.length === 0) {
    return <div className="text-xl text-white">No Transactions Found</div>;
  }

  const table = transactionsList.map(({ id, productId, quantity, time }) => {
    return (
      <tr key={id}>
        <td>{id}</td>
        <td>{sampleProducts[productId - 1]?.name}</td>
        <td>{quantity}</td>
        <td>{time.toString()}</td>
      </tr>
    );
  });

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Product</th>
          <th>Quantity</th>
          <th>Time</th>
        </tr>
      </thead>
      <tbody>{table}</tbody>
    </table>
  );
};

export default Table;

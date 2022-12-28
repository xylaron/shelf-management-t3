import { Transaction } from "types";

interface TransactionTableProps {
  transactions: Transaction[];
}

const Table: React.FC<TransactionTableProps> = ({ transactions }) => {
  if (transactions.length === 0) {
    return <div className="text-xl text-white">No Transactions Found</div>;
  }

  const table = transactions.map(({ id, product, quantity, time }) => {
    return (
      <tr key={id}>
        <td>{id}</td>
        <td>{product}</td>
        <td>{quantity}</td>
        <td>{time.toString()}</td>
      </tr>
    );
  });

  return (
    <table>
      <thead>
        <th>ID</th>
        <th>Product</th>
        <th>Quantity</th>
        <th>Time</th>
      </thead>
      <tbody>{table}</tbody>
    </table>
  );
};

export default Table;

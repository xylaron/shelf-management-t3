import { type Transactions } from "types";
//prettier-ignore
const Table: React.FC<{ transactionsList: Transactions[] }> = ({ transactionsList}) => {
  if (transactionsList.length === 0) {
    return <div className="text-xl text-white">No Transactions Found</div>;
  }

  const table = transactionsList.map(({ id, product, quantity, time }) => {
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

interface dbProduct {
  id: number;
  name: string;
  price: number;
  amount: number;
}

interface ProductTableProps {
  productList: dbProduct[];
}

const Table: React.FC<ProductTableProps> = ({ productList }) => {
  if (productList.length === 0) {
    return <div className="text-xl text-white">No Products Found</div>;
  }

  const table = productList.map(({ id, name, price, amount }) => {
    return (
      <tr key={id}>
        <td>{id}</td>
        <td>{name}</td>
        <td>${price}</td>
        <td>{amount}</td>
      </tr>
    );
  });

  return (
    <table>
      <thead>
        <th>ID</th>
        <th>Name</th>
        <th>Price</th>
        <th>Amount</th>
      </thead>
      <tbody>{table}</tbody>
    </table>
  );
};

export default Table;

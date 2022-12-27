import { trpc } from "utils/trpc";

const ProductTable = () => {
  const products = trpc.products.getAll.useQuery();
  const productList = products.data || [];

  if (productList.length === 0) {
    return <div className="text-xl text-white">No Products Found</div>;
  }

  const table = productList.map((product) => {
    return (
      <tr key={product.id}>
        <td>{product.id}</td>
        <td>{product.name}</td>
        <td>${product.price}</td>
        <td>{product.amount}</td>
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

export default ProductTable;

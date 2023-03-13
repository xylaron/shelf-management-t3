import { type Products } from "@prisma/client";

const Table: React.FC<{ productList: Products[] }> = ({ productList }) => {
  if (productList.length === 0) {
    return <div className="text-xl text-white">No Products Found</div>;
  }

  /*
  model Products {
  id                    Int                     @id @default(autoincrement())
  name                  String                  @unique
  type                  String
  width                 Float
  height                Float
  depth                 Float
  volume                Float
  price                 Float
  Transactions_Products Transactions_Products[]
}
*/

  const table = productList.map((product) => {
    return (
      <tr key={product.id}>
        <td>{product.id}</td>
        <td>{product.name}</td>
        <td>{product.type}</td>
        <td>{product.price}</td>
        <td>
          {product.width}cm x {product.height}cm x {product.depth}cm
        </td>
      </tr>
    );
  });

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Type</th>
          <th>Price</th>
          <th>Dimensions</th>
        </tr>
      </thead>
      <tbody>{table}</tbody>
    </table>
  );
};

export default Table;

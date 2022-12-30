import { type Products } from "@prisma/client";

const Table: React.FC<{ productList: Products[] }> = ({ productList }) => {
  if (productList.length === 0) {
    return <div className="text-xl text-white">No Products Found</div>;
  }

  const table = productList.map(({ id, name, price, type, size }) => {
    console.log("ID: ", id);
    console.log("Name: ", name);
    console.log("Price: ", price);
    console.log("Type: ", type);
    console.log("Size: ", size);
    return (
      <tr key={id}>
        <td>{id}</td>
        <td>{name}</td>
        <td>{type}</td>
        <td>${price.toFixed(2)}</td>
        <td>{size} mL</td>
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
          <th>Size</th>
        </tr>
      </thead>
      <tbody>{table}</tbody>
    </table>
  );
};

export default Table;
import { ProductCount, ShelfLayout } from "types/types";
import { Products, Shelves } from "@prisma/client";

interface Cubby {
  index: number;
  width: number;
  height: number;
  depth: number;
  weight_capacity: number;
}

interface CombinedProductInfo {
  id: number;
  width: number;
  height: number;
  depth: number;
  weight: number;
  count: number;
}

export interface Logs {
  type: "WARNING" | "INFO";
  message: string;
}

/*========================================================================*/
//variables for TESTING
const exampleLayoutOutput = {
  shelfId: 1,
  cubby: [
    {
      index: 1,
      items: [
        { productId: 1, depthCount: 5 },
        { productId: 1, depthCount: 5 },
        { productId: 1, depthCount: 5 },
        { productId: 2, depthCount: 4 },
        { productId: 2, depthCount: 4 },
        { productId: 2, depthCount: 4 },
      ],
    },
    {
      index: 2,
      items: [
        { productId: 3, depthCount: 5 },
        { productId: 3, depthCount: 5 },
        { productId: 3, depthCount: 5 },
        { productId: 4, depthCount: 4 },
        { productId: 4, depthCount: 4 },
        { productId: 4, depthCount: 4 },
      ],
    },
  ],
};

const productSalesCount: ProductCount[] = [
  {
    id: 1,
    count: 25,
  },
  {
    id: 2,
    count: 15,
  },
  {
    id: 3,
    count: 35,
  },
];

const products: Products[] = [
  {
    id: 1,
    name: "Bonaqua",
    type: "Bottled Water",
    width: 6.35,
    height: 20.3,
    depth: 6.35,
    volume: 500,
    price: 8.0,
  },
  {
    id: 2,
    name: "Coca-Cola",
    type: "Soft Drink",
    width: 6.6,
    height: 12.27,
    depth: 6.6,
    volume: 350,
    price: 7.0,
  },
  {
    id: 3,
    name: "Red Bull",
    type: "Energy Drink",
    width: 5.72,
    height: 15.56,
    depth: 5.72,
    volume: 350,
    price: 15.0,
  },
];

const shelf: Shelves = {
  id: 1,
  name: "Home Shelf",
  width: 56,
  height: 64,
  depth: 30,
  weight_capacity: 100,
  cubbyhole_count: 3,
  divider_height: 1,
  created_at: new Date(),
  updated_at: new Date(),
};

/*========================================================================*/

export const distributeProductsOnShelf = (
  productSalesCount: ProductCount[],
  products: Products[],
  shelf: Shelves
) => {
  //creates an array of cubbies based on the shelf info
  let cubbies: Cubby[] = [];
  const divider_height_total =
    shelf.divider_height * (shelf.cubbyhole_count - 1 + 2);
  for (let i = 0; i < shelf.cubbyhole_count; i++) {
    cubbies.push({
      index: i + 1,
      width: shelf.width,
      height: shelf.height / shelf.cubbyhole_count - divider_height_total,
      depth: shelf.depth,
      weight_capacity: shelf.weight_capacity,
    });
  }

  //combines the product info with the sales count and sorts it by sales count
  const combineSortProductInfo = (
    products: Products[],
    productSalesCount: ProductCount[]
  ): CombinedProductInfo[] => {
    let output = [] as CombinedProductInfo[];
    for (let i = 0; i < products.length; i++) {
      for (let j = 0; j < productSalesCount.length; j++) {
        if (products[i]!.id === productSalesCount[j]!.id) {
          output.push({
            id: products[i]!.id,
            width: products[i]!.width,
            height: products[i]!.height,
            depth: products[i]!.depth,
            weight: products[i]!.volume / 1000,
            count: productSalesCount[j]!.count,
          });
        }
      }
    }
    output.sort((a, b) => {
      return b.count - a.count;
    });

    return output;
  };

  const sortedProductInfo = combineSortProductInfo(products, productSalesCount);
  console.log("sortedProductInfo: ", sortedProductInfo);

  //distributes the products on the shelf

  let output = {} as ShelfLayout;
  let logs = [] as Logs[];

  const getTotalProductRatio = (): number => {
    let total = 0;
    for (let i = 0; i < sortedProductInfo.length; i++) {
      total += sortedProductInfo[i]!.width * sortedProductInfo[i]!.count;
    }
    return total;
  };

  const getTotalCubbyWidth = (): number => {
    let total = 0;
    for (let i = 0; i < cubbies.length; i++) {
      total += cubbies[i]!.width;
    }
    return total;
  };

  const getTotalSpaceXUsed = (
    shelfProductCountX: {
      id: number;
      productCountX: number;
    }[]
  ) => {
    let total = 0;
    for (let i = 0; i < sortedProductInfo.length; i++) {
      const product = sortedProductInfo[i]!;
      for (let j = 0; j < shelfProductCountX.length; j++) {
        if (product.id === shelfProductCountX[j]!.id) {
          total += product.width * shelfProductCountX[j]!.productCountX;
        }
      }
    }
    return total;
  };

  const getShelfProductCountX = () => {
    let result: {
      id: number;
      productWidth: number;
      productCountX: number;
    }[] = [];
    for (let i = 0; i < sortedProductInfo.length; i++) {
      const product = sortedProductInfo[i]!;
      const productCountX = Math.floor(product.count * unitValueRatio);
      console.log("productCountX for product", i + 1, ": ", productCountX);
      if (productCountX === 0) {
        logs.push({
          type: "WARNING",
          message: `Product "${
            products[i]!.name
          }" has too low sales count to be displayed on the shelf.`,
        });
        continue;
      }
      result.push({
        id: product.id,
        productWidth: product.width,
        productCountX: productCountX,
      });
    }
    return result;
  };

  const splitProductCountXToCubbies = (
    shelfProductCountX: {
      id: number;
      productWidth: number;
      productCountX: number;
    }[]
  ) => {
    console.log("\n\nStarting Split Product Count X To Cubbies");
    let result = [] as any;
    //goes through each cubby
    const check = structuredClone(shelfProductCountX);
    for (let i = 0; i < cubbies.length; i++) {
      result.push({
        index: cubbies[i]!.index,
        items: [],
      });
      const cubby = cubbies[i]!;

      let currentCubbyWidth = cubby.width;
      //goes through each product
      for (let j = 0; j < shelfProductCountX.length; j++) {
        //goes through each productCountX
        for (let k = 0; k < shelfProductCountX[j]!.productCountX; k++) {
          console.log("\nCurrent Cubby: ", i + 1);
          console.log("Checking product: ", j + 1);
          console.log("Current count: ", k + 1);
          console.log("currentCubbyWidth BEFORE: ", currentCubbyWidth);
          if (shelfProductCountX[j]!.productWidth > currentCubbyWidth) {
            console.log("product ", j + 1, " too big for cubby, go next");
            break;
          }
          if (check[j]!.productCountX === 0) {
            console.log("product ", j + 1, " is done, go next");
            break;
          }
          console.log("product ", j + 1, " fits in cubby, adding to cubby");
          result[i]!.items.push({
            id: shelfProductCountX[j]!.id,
            depthCount: Math.floor(cubby.depth / sortedProductInfo[j]!.depth),
          });
          currentCubbyWidth -= shelfProductCountX[j]!.productWidth;
          check[j]!.productCountX -= 1;

          console.log("currentCubbyWidth AFTER: ", currentCubbyWidth);
          console.log("check count: ", check[j]!.productCountX);
          console.log("currentResult: ", result[i]!.items);
        }
      }
      if (currentCubbyWidth > 0) {
        logs.push({
          type: "INFO",
          message: `Cubby ${cubby.index} has ${currentCubbyWidth.toFixed(
            2
          )}cm of horizontal unused space.`,
        });
      }
    }

    //reverse the order for cubbies with even index for better visual
    for (let i = 0; i < result.length; i++) {
      if (result[i]!.index % 2 === 0) {
        result[i]!.items.reverse();
      }
    }

    //check if there are any products that are not displayed
    for (let i = 0; i < check.length; i++) {
      if (
        check[i]!.productCountX > 0 &&
        shelfProductCountX[i]!.productCountX === 1
      ) {
        logs.push({
          type: "WARNING",
          message: `Product "${
            products[i]!.name
          }" has too low sales count to be displayed on the shelf.`,
        });
      }
    }

    return result;
  };

  const totalProductRatio = getTotalProductRatio();
  const totalCubbyWidth = getTotalCubbyWidth();

  const unitValueRatio = totalCubbyWidth / totalProductRatio;
  console.log("unitValueRatio: ", unitValueRatio);

  const shelfProductCountX = getShelfProductCountX();
  console.log("shelfProductCountX: ", shelfProductCountX);
  console.log("totalCubbyWidth: ", totalCubbyWidth);
  console.log("totalSpaceXUsed: ", getTotalSpaceXUsed(shelfProductCountX));

  const splitProductCountX = splitProductCountXToCubbies(shelfProductCountX);
  console.log("splitProductCountX: ", splitProductCountX);

  output.shelfId = shelf.id;
  output.cubby = splitProductCountX;

  return {
    output: output,
    logs: logs,
  };
};

/*========================================================================*/
console.log("\n\n");
console.log(
  "\n\nFINAL OUTPUT: ",
  distributeProductsOnShelf(productSalesCount, products, shelf)
);
console.log("\n\n");

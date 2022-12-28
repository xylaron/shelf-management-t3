export interface Transaction {
  id: number;
  product: string;
  quantity: number;
  time: Date;
}

export interface Product {
  name: string;
  type: string;
  size: number;
  price: number;
}

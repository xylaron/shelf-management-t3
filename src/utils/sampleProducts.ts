interface SampleProduct {
  name: string;
  type: string;
  size: number;
  price: number;
}
//prettier-ignore
export const sampleProducts: SampleProduct[] = [
  { name: 'Aquafina', type: 'Bottled Water', size: 500, price: 1.50},
  { name: 'Coca-Cola', type: 'Soft Drink', size: 355, price: 1.75},
  { name: 'Red Bull', type: 'Energy Drink', size: 250, price: 2.50},
  { name: 'Tropicana Orange Juice', type: 'Fruit Juice', size: 355, price: 2.25},
  { name: 'Lipton Iced Tea', type: 'Iced Tea', size: 500, price: 1.50},
  { name: 'Gatorade', type: 'Sports Drink', size: 591, price: 2.00},
  { name: 'Milk', type: 'Milk', size: 3785, price: 3.50},
  { name: 'Starbucks Coffee', type: 'Coffee', size: 355, price: 2.50},
  { name: 'Lipton Tea', type: 'Tea', size: 200, price: 3.00},
  { name: 'Budweiser', type: 'Beer', size: 355, price: 1.50},
];

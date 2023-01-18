export interface SampleProduct {
  name: string;
  type: string;
  size: number;
  price: number;
}
//prettier-ignore
export const sampleProducts: SampleProduct[] = [
  { name: 'Bonaqua', type: 'Bottled Water', size: 500, price: 8.00},
  { name: 'Coca-Cola', type: 'Soft Drink', size: 350, price: 7.00},
  { name: 'Red Bull', type: 'Energy Drink', size: 500, price: 15.00},
  { name: 'Minute Maid Orange Juice', type: 'Fruit Juice', size: 420, price: 7.00},
  { name: 'Lipton Iced Tea', type: 'Iced Tea', size: 400, price: 6.50},
  { name: 'Lucozade', type: 'Sports Drink', size: 600, price: 15.00},
  { name: 'Sprite', type: 'Soft Drink', size: 350, price: 7.00},
  { name: 'Starbucks Coffee', type: 'Coffee', size: 350, price: 25.00},
  { name: 'Lipton Tea', type: 'Tea', size: 200, price: 6.00},
  { name: 'Budweiser', type: 'Beer', size: 350, price: 9.50},
];

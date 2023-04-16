//types or interfaces are defined here
export interface ProductCount {
  id: number;
  count: number;
}

export interface ShelfLayout {
  shelfId: number;
  cubby: {
    items: {
      id: number;
      depthCount: number;
    }[];
  }[];
}

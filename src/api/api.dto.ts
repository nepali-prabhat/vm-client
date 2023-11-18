export type InventoryItemDto = {
  id: number;
  name: string;
  price: number;
  stock: number;
  imageName: string | null;
};
export type FundStockDto = {
  fundType: string;
  stock: number;
};

export type OrderResponseDto = {
  id: number;
  inventoryId: number;
  orderStatus: string;
  createdAt: string;
  updatedAt: string;
};

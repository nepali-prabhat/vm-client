type Change = {
  coin: number;
  cash: number;
};
export type Inventory = {
  id: number;
  name: string;
  price: number;
  stock: number;
  imageName: string;
};

export type PurchaseSseContracts = {
  type:
    | "PURCHASE_START"
    | "NO_PENDING_ORDER"
    | "OUT_OF_STOCK"
    | "INSUFFICIENT_FUND"
    | "OUT_OF_CASH"
    | "OUT_OF_COINS"
    | "PURCHASE_SUCCESS"
    | "REFUND_START"
    | "REFUND_SUCCESS"
    | "REFUND_FAILED"
    | "PURCHASE_UNEXPECTEDLY_FAILED";
  message: string;
  change: Change;
  inventory?: Inventory;
};

export interface PurchaseSseEventListener {
  (event: PurchaseSseContracts): void;
}

export type RefundResponseDto = {
  change: Change;
};

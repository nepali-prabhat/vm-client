export type OrderSseContracts = {
  type: "ORDER_PENDING" | "ORDER_CANCELLED" | "ORDER_TIMEOUT";
};

export interface OrderSseEventListener {
  (event: OrderSseContracts): void;
}

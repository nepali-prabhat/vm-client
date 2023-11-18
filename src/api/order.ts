import { api } from "./api";
import { OrderResponseDto } from "./api.dto";

export async function createOrder() {
  const response = await api.post<OrderResponseDto>("/order/inventory/2");
  return response.data;
}

export async function cancelOrTimeoutPendingOrder() {
  await api.put("/order/cancel-or-timeout-pending");
}

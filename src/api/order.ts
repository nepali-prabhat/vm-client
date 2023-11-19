import { useCallback, useState } from "react";
import { api } from "./api";
import { OrderResponseDto } from "./api.dto";
import { OrderSseContracts } from "./orderSse.dto";
import { apiBaseUrl } from "@/constants";
import { useSSE } from "@/hooks/useSse";

export async function createOrder(inventoryId: number) {
  const response = await api.post<OrderResponseDto>(
    `/order/inventory/${inventoryId}`,
  );
  return response.data;
}

export async function cancelOrTimeoutPendingOrder() {
  await api.put("/order/cancel-or-timeout-pending");
}

export function useOrderSse() {
  const [sseData, setSSEData] = useState<OrderSseContracts | null>(null);

  const handleSSEMessage = useCallback((event: OrderSseContracts) => {
    setSSEData(event);
  }, []);

  const handleSSEError = useCallback((error: Event) => {
    console.error("SSE Connection Error:", error);
  }, []);

  useSSE(`${apiBaseUrl}/order/sse`, handleSSEMessage, handleSSEError);

  return sseData;
}

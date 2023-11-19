import { useCallback, useEffect, useRef, useState } from "react";
import { api } from "./api";
import { CreatePurchaseDto } from "./api.dto";
import { PurchaseSseContracts } from "./purchaseSse.dto";
import { apiBaseUrl } from "@/constants";
import { useSSE } from "@/hooks/useSse";

export async function createPurchase(body: CreatePurchaseDto) {
  await api.post("/purchase", body);
}

export function usePaymentSse() {
  const [sseData, setSSEData] = useState<PurchaseSseContracts | null>(null);

  const lastDataRef = useRef<PurchaseSseContracts | null>();
  useEffect(() => {
    lastDataRef.current = sseData;
  }, [sseData]);

  const handleSSEMessage = useCallback((event: PurchaseSseContracts) => {
    setSSEData(event);
  }, []);

  const handleSSEError = useCallback((error: Event) => {
    console.error("SSE Connection Error:", error);
  }, []);

  useSSE(`${apiBaseUrl}/purchase/sse`, handleSSEMessage, handleSSEError);

  return { sseData, lastData: lastDataRef.current };
}

import { useQuery } from "@tanstack/react-query";
import { InventoryItemDto } from "./api.dto";
import { api } from "./api";

export const useFetchInventory = (id: number) => {
  return useQuery<InventoryItemDto>({
    queryKey: ["todo", id],
    queryFn: async () => {
      const response = await api.get(`/inventories/${id}`);
      return response.data;
    },
  });
};

export const useFetchInventories = (options?: { throwOnError?: boolean }) => {
  return useQuery<InventoryItemDto[]>({
    queryKey: ["todos"],
    queryFn: async () => {
      const response = await api.get("/inventories");
      return response.data;
    },
    throwOnError: options?.throwOnError ?? true,
  });
};

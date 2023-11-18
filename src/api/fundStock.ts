import { useQuery } from "@tanstack/react-query";
import { FundStockDto } from "./api.dto";
import { api } from "./api";

export const useFetchFundStock = (options?: {
  throwOnError?: boolean;
  include?: string[];
}) => {
  return useQuery<FundStockDto[]>({
    queryKey: ["fund-stock"],
    queryFn: async () => {
      const response = await api.get(`/fund-stock`);
      return response.data;
    },
    throwOnError: options?.throwOnError ?? true,
    select: (data) => {
      return data.filter((d) => options?.include?.includes(d.fundType) ?? true);
    },
  });
};

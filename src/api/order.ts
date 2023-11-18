import { useMutation } from "@tanstack/react-query";
import { OrderResponseDto } from "./api.dto";
import { api } from "./api";
import { AxiosError } from "axios";

export const useCreateOrder = () => {
  return useMutation<OrderResponseDto>({
    mutationFn: () => api.post("/order/inventory/2"),
    onSuccess: (data) => {
      console.log("data: ", data);
    },
    onError: (error) => {
      //   if (error instanceof AxiosError) {
      //     if (error.response?.status === 409) {
      //       options.onConflict();
      //     }
      //   }
    },
  });
};

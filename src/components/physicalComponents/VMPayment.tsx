import * as z from "zod";
import { Input } from "@/components/ui/input";
import { ArrowRight, Coins, Receipt, ScanBarcode } from "lucide-react";
import { IconButton } from "../ui/button";
import { Label } from "../ui/label";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { PAYMENT_SLOT_FAQ } from "@/constants";
import { cn, isLastElement } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { createPurchase } from "@/api/purchase";
import { useOrderSse } from "@/api/order";

const paymentSchema = z.object({
  coin: z.coerce.number(),
  cash: z.coerce.number(),
});

const initialFormState = {
  coin: "0",
  cash: "0",
};
export function VMPayment() {
  const [formState, setFormState] = useState<{ coin: string; cash: string }>(
    initialFormState,
  );
  const resetFormState = () => {
    setFormState(initialFormState);
  };

  const createPurchaseMutation = useMutation({
    mutationFn: createPurchase,
    onSettled: () => {
      resetFormState();
    },
  });

  const orderSseData = useOrderSse();
  useEffect(() => {
    if (orderSseData?.type === "ORDER_CANCELLED") {
      resetFormState();
    }
  }, [orderSseData]);

  const handleFormChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    if (name) {
      setFormState((v) => ({
        ...v,
        [name]: value,
      }));
    }
  };

  const handleFormSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const response = paymentSchema.safeParse(formState);
    if (response.success) {
      const data = response.data;
      createPurchaseMutation.mutate(data);
    }
  };

  const isOrderPending = orderSseData?.type === "ORDER_PENDING";
  const activatePayment = isOrderPending;

  return (
    <section className="">
      <div
        className={cn(
          "py-2 flex gap-2 justify-center items-center",
          activatePayment ? "text-green-400" : "",
        )}
      >
        <ScanBarcode />
        <h3 className="text-xl font-black">Payment Slot</h3>
      </div>
      <div className="border rounded-md p-2 pb-0 grid">
        <form onSubmit={handleFormSubmit} className="grid gap-2">
          <div className="flex items-center gap-2">
            <div className="h-[100%] grid gap-2 justify-center items-center">
              <Label
                htmlFor="coin"
                className="flex justify-between items-center gap-1 "
                aria-label="Coin"
              >
                <Coins className="h-[1.2rem] w-[1.2rem]" />
                <span>Coins</span>
              </Label>
              <Label
                htmlFor="cash"
                className="flex justify-between items-center gap-1 "
                aria-label="Cash"
              >
                <Receipt className="h-[1.2rem] w-[1.2rem]" />
                <span>Cash</span>
              </Label>
            </div>
            <div className="flex-1 grid gap-2">
              <Input
                value={formState.coin}
                onChange={handleFormChange}
                min={0}
                name="coin"
                id="coin"
                type="number"
                disabled={!activatePayment}
              />
              <Input
                value={formState.cash}
                onChange={handleFormChange}
                min={0}
                name="cash"
                id="cash"
                type="number"
                disabled={!activatePayment}
              />
            </div>
          </div>
          <IconButton
            className="w-[100%]"
            type="submit"
            isLoading={createPurchaseMutation.isPending}
            disabled={!activatePayment || createPurchaseMutation.isPending}
            icon={ArrowRight}
          >
            Go
          </IconButton>
        </form>
        <div className="px-2">
          <PaymentSlotFAQ />
        </div>
      </div>
    </section>
  );
}

function PaymentSlotFAQ() {
  return (
    <Accordion type="single" collapsible>
      {PAYMENT_SLOT_FAQ.map(({ title, content }, i) => (
        <AccordionItem
          value={`item-${i}`}
          key={`PAYMENT_SLOT_FAQ_${i}`}
          className={cn({
            "border-b-0": isLastElement(PAYMENT_SLOT_FAQ, i),
          })}
        >
          <AccordionTrigger>{title}</AccordionTrigger>
          <AccordionContent>{content}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

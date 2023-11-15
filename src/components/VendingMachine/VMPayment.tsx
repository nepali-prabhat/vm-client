import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Coins, Receipt, ScanBarcode } from "lucide-react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { PAYMENT_SLOT_FAQ } from "@/constants";
import { cn, isLastElement } from "@/lib/utils";
import { useState } from "react";
import { toast } from "../ui/use-toast";

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

const paymentSchema = z.object({
  coins: z.coerce.number(),
  cash: z.coerce.number(),
});

export function VMPayment() {
  const [formState, setFormState] = useState<{ coins: string; cash: string }>({
    coins: "0",
    cash: "0",
  });

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
      toast({
        title: "You submitted the following values:",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{JSON.stringify(data, null, 2)}</code>
          </pre>
        ),
      });
    }
  };

  return (
    <section className="">
      <div className="py-2 flex gap-2 justify-center items-center">
        <ScanBarcode />
        <h3 className="text-xl font-black">Payment Slot</h3>
      </div>
      <div className="border rounded-md p-2 pb-0 grid">
        <form onSubmit={handleFormSubmit} className="grid gap-2">
          <div className="flex items-center gap-2">
            <div className="h-[100%] grid gap-2 justify-center items-center">
              <Label
                htmlFor="coins"
                className="flex justify-between items-center gap-1 "
                aria-label="Coins"
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
                value={formState.coins}
                onChange={handleFormChange}
                min={0}
                name="coins"
                id="coins"
                type="number"
              />
              <Input
                value={formState.cash}
                onChange={handleFormChange}
                min={0}
                name="cash"
                id="cash"
                type="number"
              />
            </div>
          </div>
          <Button className="w-[100%]" type="submit">
            Go <ArrowRightIcon></ArrowRightIcon>
          </Button>
        </form>
        <div className="px-2">
          <PaymentSlotFAQ />
        </div>
      </div>
    </section>
  );
}

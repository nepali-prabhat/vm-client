import * as z from "zod";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { CircleSlash2, IterationCw } from "lucide-react";
import { DRINK_NAMES, DrinkType } from "@/constants";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Label } from "../ui/label";
import { toast } from "../ui/use-toast";

const isOpen = true;
const drinkSchema = z.enum(["", ...DRINK_NAMES]).default("");
export function VMRefund() {
  const [drink, setDrink] = useState<DrinkType>();

  const handleDrinkChange = (value: DrinkType) => {
    setDrink(value);
  };
  const handleFormSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const response = drinkSchema.safeParse(drink);
    if (response.success) {
      const data = { drink: response.data };
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
        <IterationCw />
        <h3 className="text-xl font-black">Refund Slot</h3>
      </div>
      <div
        className={cn("border rounded-md", {
          "opacity-50": !isOpen,
        })}
      >
        {!isOpen ? (
          <div className="h-[180px]  p-2 flex text-sm font-medium flex-col gap-2 justify-center items-center h-[100%]">
            <CircleSlash2 className="" />
            Closed
          </div>
        ) : (
          <form onSubmit={handleFormSubmit} className="grid gap-2 p-2">
            <Label htmlFor="refund-item" className="text-sm">
              Place a drink in the slot...
            </Label>
            <RadioGroup
              id="refund-item"
              value={drink}
              onValueChange={handleDrinkChange}
            >
              {DRINK_NAMES.map((d) => (
                <div
                  key={`REFUND_SLOT_DRINK_${d}_KEY`}
                  className="flex items-center space-x-2"
                >
                  <RadioGroupItem value={d} id={`REFUND_SLOT_DRINK_${d}`} />
                  <Label htmlFor={`REFUND_SLOT_DRINK_${d}`}>{d}</Label>
                </div>
              ))}
            </RadioGroup>
            <Button type="submit">
              Go <ArrowRightIcon></ArrowRightIcon>
            </Button>
          </form>
        )}
      </div>
    </section>
  );
}

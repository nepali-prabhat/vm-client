import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { AlertTriangle, IterationCw } from "lucide-react";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Label } from "../ui/label";
import { toast } from "../ui/use-toast";
import { useFetchInventories } from "@/api/inventories";
import { AppLoader } from "../ui/appLoader";
import { useMutation } from "@tanstack/react-query";
import { createRefund } from "@/api/purchase";
import { AxiosError } from "axios";

export function VMRefund() {
  const [drink, setDrink] = useState<string>();

  const inventoriesResponse = useFetchInventories({ throwOnError: false });

  const createRefundMutation = useMutation({
    mutationFn: createRefund,
    onSuccess: (data) => {
      toast({
        title: "Refund successful",
        description: `Collect ${[
          data.change.coin ? data.change.coin + " coins" : "",
          data.change.cash ? "रु " + data.change.cash + " cash" : "",
        ].join(" and ")} from the dispenser`,
      });
    },
    onError: (error) => {
      let description: string | undefined;
      if (error instanceof AxiosError) {
        description = error.response?.data?.message;
      }
      toast({
        title: "Refund failed",
        description: `${description}. Your item is back in the dispenser`,
      });
    },
  });

  const handleDrinkChange = (value: string) => {
    setDrink(value);
  };
  const handleFormSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    drink && createRefundMutation.mutate(+drink);
  };

  return (
    <section className="">
      <div className="py-2 flex gap-2 justify-center items-center">
        <IterationCw />
        <h3 className="text-xl font-black">Refund Slot</h3>
      </div>
      <div className={cn("border rounded-md")}>
        {inventoriesResponse.isError ? (
          <div className="flex justify-center items-center text-red-400 min-h-[180px] p-2">
            <div className="flex flex-col items-center gap-2">
              <AlertTriangle />
              <span>Error</span>
            </div>
          </div>
        ) : inventoriesResponse.isLoading || !inventoriesResponse.data ? (
          <div className="flex justify-center items-center min-h-[180px] p-2">
            <AppLoader />
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
              {inventoriesResponse.data.map((d) => (
                <div
                  key={`REFUND_SLOT_DRINK_${d.id}_KEY`}
                  className="flex items-center space-x-2"
                >
                  <RadioGroupItem
                    value={"" + d.id}
                    id={`REFUND_SLOT_DRINK_${d.id}`}
                  />
                  <Label htmlFor={`REFUND_SLOT_DRINK_${d.id}`}>{d.name}</Label>
                </div>
              ))}
            </RadioGroup>
            <Button type="submit" disabled={!drink}>
              Go <ArrowRightIcon></ArrowRightIcon>
            </Button>
          </form>
        )}
      </div>
    </section>
  );
}

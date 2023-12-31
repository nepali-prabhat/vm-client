import { ArrowBigDownDash, CircleSlash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePaymentSse } from "@/api/purchase";
import { getPublicImagesUrl } from "@/api/api";
import { useState } from "react";
import { toast } from "../ui/use-toast";
import { cn } from "@/lib/utils";
import defaultCan from "@/assets/images/drinkTemplate.png";
import { Badge } from "../ui/badge";

export function VMDispenser() {
  const { sseData: paymentSseData, lastData } = usePaymentSse();
  const [isItemCollected, setIsItemCollected] = useState(false);

  // Note: This is fine.
  // We are conditionally updating the state variable based on state transition
  if (
    (lastData?.type === "PURCHASE_START" ||
      lastData?.type === "REFUND_START") &&
    isItemCollected
  ) {
    setIsItemCollected(false);
  }

  const handleButtonClick = () => {
    setIsItemCollected(true);
    const inventory = paymentSseData?.inventory;
    const change = paymentSseData?.change;
    toast({
      title: "You collected the following items:",
      description: (
        <p>
          {[
            inventory?.name,
            change?.coin ? `${change?.coin} coins` : undefined,
            change?.cash ? `${change?.cash} cash` : undefined,
          ]
            .filter((x) => x)
            .join(", ")}
        </p>
      ),
    });
  };

  const show = !!paymentSseData && !isItemCollected;

  return (
    <section className="">
      <div
        className={cn(
          "py-2 flex gap-2 justify-center items-center",
          show ? "text-green-400" : "",
        )}
      >
        <ArrowBigDownDash />
        <h3 className="text-xl font-black">Dispenser</h3>
      </div>
      <Button
        onClick={handleButtonClick}
        variant="outline"
        className="w-[100%] h-[200px] p-2"
        disabled={!show}
      >
        <div className="flex flex-col gap-2 items-center justify-center">
          {!show ? (
            <>
              <CircleSlash2 className="" />
              Closed
            </>
          ) : (
            <div className="flex flex-col items-center justify-center gap-2">
              {paymentSseData.inventory ? (
                <>
                  <img
                    src={
                      paymentSseData.inventory.imageName
                        ? getPublicImagesUrl(paymentSseData.inventory.imageName)
                        : defaultCan
                    }
                    width={"20%"}
                    alt={`A can of ${paymentSseData.inventory.name}`}
                  />
                  <Badge variant={"outline"}>
                    {paymentSseData.inventory.name}
                  </Badge>
                </>
              ) : null}
              {paymentSseData.change.coin ? (
                <span>Coins: {paymentSseData.change.coin}</span>
              ) : null}
              {paymentSseData.change.cash ? (
                <span>Cash: रु {paymentSseData.change.cash}</span>
              ) : null}
            </div>
          )}
        </div>
      </Button>
    </section>
  );
}

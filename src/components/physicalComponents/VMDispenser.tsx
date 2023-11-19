import { ArrowBigDownDash, CircleSlash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePaymentSse } from "@/api/purchase";
import { getPublicImagesUrl } from "@/api/api";
import { useState } from "react";
import { toast } from "../ui/use-toast";
import { cn } from "@/lib/utils";

export function VMDispenser() {
  const { sseData: paymentSseData, lastData } = usePaymentSse();
  const [isItemCollected, setIsItemCollected] = useState(false);

  // This is fine.
  // We are conditionally updating the state variable based on state transition
  if (lastData?.type === "PURCHASE_START" && isItemCollected) {
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
        className="w-[100%] h-[180px] p-2"
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
              {paymentSseData.inventory?.imageName ? (
                <img
                  src={getPublicImagesUrl(paymentSseData.inventory.imageName)}
                  width={"20%"}
                  alt={`A can of ${paymentSseData.inventory.name}`}
                />
              ) : null}
              <span>Coins: {paymentSseData.change.coin}</span>
              <span>Cash: रु {paymentSseData.change.cash}</span>
            </div>
          )}
        </div>
      </Button>
    </section>
  );
}

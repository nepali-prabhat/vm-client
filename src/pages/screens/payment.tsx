import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link, useParams } from "react-router-dom";
import drinkTemplate from "@/assets/images/drinkTemplate.png";
import { getPublicImagesUrl } from "@/api/api";
import { useFetchInventory } from "@/api/inventories";
import { AppLoader } from "@/components/globalLoader";
import { useCreateOrder } from "@/api/order";
import { AxiosError } from "axios";
import { CornerDownRight, Loader } from "lucide-react";

export function Payment() {
  const data = useParams();
  const drinkId = data.drinkId;

  const [hasConfirmed, setHasConfirmed] = useState<boolean>(false);
  const [eventStatus, setEventStatus] = useState<string>("Pending Payment");
  const inventory = useFetchInventory(+drinkId!);

  const createOrderMutation = useCreateOrder();

  const handleConfirmClick = () => {
    createOrderMutation.mutate();
    setHasConfirmed(true);
  };

  if (inventory.isLoading || !inventory.data) {
    return <AppLoader />;
  }

  const drink = inventory.data;
  const drinkCost = drink.price || 0;
  const drinkSrc = drink.imageName
    ? getPublicImagesUrl(drink.imageName)
    : drinkTemplate;

  const hasConflict =
    createOrderMutation.error &&
    createOrderMutation.error instanceof AxiosError;

  return (
    <>
      <img
        className="rotate-12 translate-x-5"
        src={drinkSrc}
        width={"10%"}
        alt={`A can of ${drink?.name || "drink"}`}
      />

      {hasConflict ? (
        <div className="flex">
          <Loader className="motion-safe:animate-spin" />
          <p>Please wait there is an ongoing order...</p>
        </div>
      ) : !hasConfirmed ? (
        <div className="flex">
          <p>
            You are about you buy {drink.name} for रु {drink.price}
          </p>
        </div>
      ) : (
        <>
          <Badge className="text-2xl font-bold" variant="outline">
            रु {drinkCost}
          </Badge>
          <p className="text-xl font-medium">{eventStatus}</p>
          <p>Pay with coins or cash or both in the payment slot below.</p>
        </>
      )}
      <div className="flex gap-2">
        <Button asChild variant="secondary">
          <Link to="/">Cancel</Link>
        </Button>
        {!createOrderMutation.error && !hasConfirmed ? (
          <Button onClick={handleConfirmClick}>
            <CornerDownRight className="h-[1.2rem] w-[1.2rem]" />
            Confirm
          </Button>
        ) : null}
      </div>
    </>
  );
}

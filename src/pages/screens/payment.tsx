import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { IconButton } from "@/components/ui/button";
import { useNavigate, useParams } from "react-router-dom";
import drinkTemplate from "@/assets/images/drinkTemplate.png";
import { getPublicImagesUrl } from "@/api/api";
import { useFetchInventory } from "@/api/inventories";
import { AppLoader } from "@/components/globalLoader";
import { cancelOrTimeoutPendingOrder, createOrder } from "@/api/order";
import { AxiosError } from "axios";
import { CornerDownRight, Loader } from "lucide-react";
import { useMutation } from "@tanstack/react-query";

export function Payment() {
  const data = useParams();
  const navigate = useNavigate();
  const drinkId = data.drinkId;

  const [hasConfirmed, setHasConfirmed] = useState<boolean>(false);
  const [eventStatus] = useState<string>("Pending Payment");
  const inventory = useFetchInventory(+drinkId!);

  const createOrderMutation = useMutation({ mutationFn: createOrder });
  const cancelOrTimeoutPendingOrderMutation = useMutation({
    mutationFn: cancelOrTimeoutPendingOrder,
    onSuccess: () => {
      navigate("/");
    },
  });

  const handleConfirmClick = () => {
    createOrderMutation.mutate();
    setHasConfirmed(true);
  };
  const handleCancelClick = () => {
    cancelOrTimeoutPendingOrderMutation.mutate();
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
        <IconButton
          isLoading={cancelOrTimeoutPendingOrderMutation.isPending}
          disabled={cancelOrTimeoutPendingOrderMutation.isPending}
          variant="secondary"
          onClick={handleCancelClick}
        >
          Cancel
        </IconButton>
        {!createOrderMutation.error && !hasConfirmed ? (
          <IconButton
            icon={CornerDownRight}
            isLoading={createOrderMutation.isPending}
            disabled={createOrderMutation.isPending}
            onClick={handleConfirmClick}
          >
            Confirm
          </IconButton>
        ) : null}
      </div>
    </>
  );
}

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { IconButton } from "@/components/ui/button";
import { useNavigate, useParams } from "react-router-dom";
import drinkTemplate from "@/assets/images/drinkTemplate.png";
import { getPublicImagesUrl } from "@/api/api";
import { useFetchInventory } from "@/api/inventories";
import { AppLoader } from "@/components/ui/appLoader";
import { cancelOrTimeoutPendingOrder, createOrder } from "@/api/order";
import { AxiosError } from "axios";
import { CornerDownRight, Loader } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { usePaymentSse } from "@/api/purchase";
import { ORDER_TIMEOUT_IN_SECONDS } from "@/constants";

export function Payment() {
  const data = useParams();
  const drinkId = data.drinkId;
  const navigate = useNavigate();

  const [countdown, setCountdown] = useState<number>(ORDER_TIMEOUT_IN_SECONDS);
  const [hasConfirmed, setHasConfirmed] = useState<boolean>(false);

  const { sseData: paymentSseData } = usePaymentSse();

  const inventory = useFetchInventory(+drinkId!);

  const createOrderMutation = useMutation({
    mutationFn: createOrder,
    onSuccess: () => {
      setHasConfirmed(true);
    },
  });
  const cancelOrTimeoutPendingOrderMutation = useMutation({
    mutationFn: cancelOrTimeoutPendingOrder,
    onSuccess: () => {
      navigate("/");
    },
  });

  useEffect(() => {
    if (createOrderMutation.isSuccess) {
      const intervalId = setInterval(() => {
        setCountdown(
          (prevCountdown) => (prevCountdown || ORDER_TIMEOUT_IN_SECONDS) - 1,
        );
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [createOrderMutation.isSuccess]);

  useEffect(() => {
    if (countdown === 0) {
      cancelOrTimeoutPendingOrderMutation.mutate();
    }
  }, [countdown, cancelOrTimeoutPendingOrderMutation]);

  const handleConfirmClick = () => {
    drinkId && createOrderMutation.mutate(+drinkId);
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

  const eventStatus = createOrderMutation.isSuccess
    ? paymentSseData?.message ?? "Pending Payment"
    : "";

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
          {eventStatus ? (
            <p className="text-xl font-medium">{eventStatus}</p>
          ) : null}
          <p>Pay with coins or cash or both in the payment slot below.</p>
        </>
      )}
      <div className="flex gap-2">
        <IconButton
          iconPosition="start"
          isLoading={cancelOrTimeoutPendingOrderMutation.isPending}
          disabled={cancelOrTimeoutPendingOrderMutation.isPending}
          variant="secondary"
          onClick={handleCancelClick}
        >
          Cancel {createOrderMutation.isSuccess ? `(${countdown})` : ""}
        </IconButton>
        {!createOrderMutation.error && !hasConfirmed ? (
          <IconButton
            iconPosition="start"
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

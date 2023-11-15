import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link, useParams } from "react-router-dom";
import { DRINKS } from "@/constants";

export function Payment() {
  const data = useParams();
  const drinkId = data.drinkId;

  const drink = DRINKS.find((d) => drinkId && d.id === +drinkId);
  const drinkCost = drink?.cost || 0;
  const drinkSrc = drink?.src;

  return (
    <>
      <img
        src={drinkSrc}
        width={"10%"}
      />
      <Badge className="text-2xl" variant="outline">
        NPR {drinkCost}
      </Badge>
      <p>Pay with coins or cash or both in the payment slot below.</p>
      <Button asChild>
        <Link to="/">Cancel</Link>
      </Button>
    </>
  );
}

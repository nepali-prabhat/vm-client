import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DRINKS } from "@/constants";
import { Link, useParams } from "react-router-dom";
import drinkTemplate from "@/assets/images/drinkTemplate.png";

export function Payment() {
  const data = useParams();
  const drinkId = data.drinkId;

  const drink = DRINKS.find((d) => drinkId && d.id === +drinkId);
  const drinkCost = drink?.cost || 0;
  const drinkSrc = drink?.src || drinkTemplate;

  return (
    <>
      <img
        className="rotate-12 translate-x-5"
        src={drinkSrc}
        width={"10%"}
        alt={`A can of ${drink?.name || "drink"}`}
      />
      <Badge className="text-2xl font-bold" variant="outline">
        रु {drinkCost}
      </Badge>
      <p>Pay with coins or cash or both in the payment slot below.</p>
      <Button asChild variant="secondary">
        <Link to="/">Cancel</Link>
      </Button>
    </>
  );
}

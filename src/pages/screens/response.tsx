import { DRINKS } from "@/constants";
import { useParams } from "react-router-dom";
import drinkTemplate from "@/assets/images/drinkTemplate.png";

export function Response() {
  const data = useParams();
  const drinkId = data.drinkId;
  const status = data.status;

  const drink = DRINKS.find((d) => drinkId && d.id === +drinkId);
  const drinkSrc = drink?.src || drinkTemplate;

  return (
    <>
      <img
        className="rotate-12 translate-x-5"
        src={drinkSrc}
        width={"10%"}
        alt={`A can of ${drink?.name || "drink"}`}
      />
      <h2 className="text-4xl font-black">Purchase {status} :)</h2>
      <p>
        Thank you for using Outside Drinks. Collect your drink and change from
        the dispenser below.
      </p>
    </>
  );
}

import { DRINKS } from "@/constants";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

type Drink = (typeof DRINKS)[0];

function MachineItem({ id, name, src, cost }: Drink) {
  return (
    <Button
      asChild
      className="w-[200px] flex-col gap-2 h-[200px]"
      variant="outline"
    >
      <Link to={`/${id}`}>
        <img
          className="pointer-events-none"
          src={src}
          width={"30%"}
          alt={`A can of ${name}`}
        />
        <h3 className="text-2xl font-recursive font-black uppercase">{name}</h3>
        <span>रु {cost || "-"}</span>
      </Link>
    </Button>
  );
}
export function MachineItems() {
  return (
    <div className="flex gap-5">
      {DRINKS.map((drink) => (
        <MachineItem key={`MACHINE_ITEM_${drink.name}`} {...drink} />
      ))}
    </div>
  );
}

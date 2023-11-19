import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { InventoryItemDto } from "@/api/api.dto";
import defaultDrinkImage from "@/assets/images/drinkTemplate.png";
import { getPublicImagesUrl } from "@/api/api";

function MachineItem({ id, name, imageName, price }: InventoryItemDto) {
  const src = imageName ? getPublicImagesUrl(imageName) : defaultDrinkImage;

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
        <span>रु {price || "-"}</span>
      </Link>
    </Button>
  );
}
export function MachineItems({ drinks }: { drinks: InventoryItemDto[] }) {
  return (
    <div className="max-h-[500px] grid grid-cols-3 gap-5 overflow-y-auto">
      {drinks.map((drink) => (
        <MachineItem key={`MACHINE_ITEM_${drink.name}`} {...drink} />
      ))}
    </div>
  );
}

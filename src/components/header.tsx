import cans from "@/assets/images/cans.png";
import { Badge } from "./ui/badge";
import { useFetchInventories } from "@/api/inventories";
import { useFetchFundStock } from "@/api/fundStock";
import { usePaymentSse } from "@/api/purchase";
import { useEffect } from "react";

function Stats() {
  const inventoriesResponse = useFetchInventories({ throwOnError: false });
  const fundStockResponse = useFetchFundStock({
    throwOnError: false,
  });
  const { sseData: paymentSseData } = usePaymentSse();
  useEffect(() => {
    if (paymentSseData) {
      inventoriesResponse.refetch();
      fundStockResponse.refetch();
    }
  }, [fundStockResponse, inventoriesResponse, paymentSseData]);

  if (!inventoriesResponse.data || !fundStockResponse.data) {
    return null;
  }

  return (
    <div className="py-1 px-2 flex items-center gap-4">
      {inventoriesResponse.data.map(({ name, stock }) => (
        <div key={`STAT_${name}`} className="flex gap-2">
          <span className="font-black">{name}</span>
          <span>{stock}</span>
        </div>
      ))}
      {fundStockResponse.data.map(({ fundType, stock }) => (
        <div key={`STAT_${fundType}`} className="flex gap-2">
          <span className="font-black">{fundType}</span>
          <span>{stock}</span>
        </div>
      ))}
    </div>
  );
}
export function Header() {
  return (
    <header className="relative rotate-[-5deg]">
      {/* For the long horizontal line at the back */}
      <div aria-hidden={true} className="absolute w-[200%] left-[-50%]">
        <h1 className="px-4 bg-primary text-primary text-7xl truncate font-recursive callout">
          .
        </h1>
      </div>

      <div>
        <Badge
          title="Vending Machine"
          className="px-4 shadow-xl translate-x-3 -translate-y-4 text-7xl truncate font-recursive callout"
        >
          Outside Drinks
        </Badge>
      </div>

      <div>
        <Badge
          className="shadow-xl translate-x-6 -translate-y-6"
          variant="default"
        >
          <Stats />
        </Badge>
      </div>
      <img
        className="rotate-[6deg] absolute right-0 -top-2"
        src={cans}
        width={"10%"}
        alt="A set of canned drinks"
      />
    </header>
  );
}

import { useFetchInventories } from "@/api/inventories";
import { AppLoader } from "@/components/ui/appLoader";
import { MachineItems } from "@/components/machine-items";

export function Drinks() {
  const inventoriesResponse = useFetchInventories();

  if (inventoriesResponse.isLoading) {
    return <AppLoader />;
  }

  return (
    <>
      <h2 className="text-4xl font-black">Choose your drink</h2>
      <MachineItems drinks={inventoriesResponse.data || []} />
    </>
  );
}

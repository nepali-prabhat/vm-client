import { MachineItems } from "@/components/machine-items";
import { useOutletContext } from "react-router-dom";

export function Drinks() {
  const ctx = useOutletContext();
  console.log("ctx: ", ctx);
  return (
    <>
      <h2 className="text-4xl font-black">Choose your drink</h2>
      <MachineItems />
    </>
  );
}

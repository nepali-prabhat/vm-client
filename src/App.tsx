import { Toaster } from "@/components/ui/toaster";
import VMScreen from "@/pages/screens";
import { VMDispenser } from "@/components/VendingMachine/VMDispenser";
import { VMPayment } from "./components/VendingMachine/VMPayment";
import { SCREEN_DIMENSIONS } from "./constants";
import { VMRefund } from "./components/VendingMachine/VMRefundSlot";
import { Separator } from "./components/ui/separator";

function App() {
  return (
    <main className="overflow-x-hidden w-[100vw] flex justify-center">
      <div
        className="flex flex-col items-center gap-2"
        style={{ width: SCREEN_DIMENSIONS.width }}
      >
        <VMScreen />
        <Separator></Separator>
        <section className="w-[100%]">
          <div className="grid grid-cols-3 gap-4">
            <VMPayment />
            <VMDispenser />
            <VMRefund />
          </div>
        </section>
      </div>
      <Toaster />
    </main>
  );
}

export default App;

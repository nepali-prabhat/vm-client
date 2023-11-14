import { IterationCw } from "lucide-react";
import { SCREEN_DIMENSIONS, STATS } from "@/constants";
import { Outlet } from "react-router-dom";
import cans from "@/assets/images/cans.png";
import { Badge } from "@/components/ui/badge";
import { Button } from "./components/ui/button";
import { ModeToggle } from "./components/mode-toggle";

export function Header() {
  return (
    <header className="relative rotate-[-5deg]">
      {/* For the long horizontal line at the back */}
      <div aria-hidden={true} className="absolute w-[200%] left-[-50%]">
        <h1 className="px-4 bg-primary text-primary text-7xl truncate font-recursive callout">
          .
        </h1>
      </div>

      <Badge
        title="Vending Machine"
        className="px-4 shadow-xl translate-x-5 -translate-y-4 text-7xl truncate font-recursive callout"
      >
        Outside Drinks
      </Badge>

      <div>
        <Badge
          className="shadow-xl translate-x-5 -translate-y-6"
          variant="default"
        >
          <div className="py-1 px-2 flex items-center gap-4">
            {STATS.map(({ name, value }) => (
              <div key={`STAT_${name}`} className="flex gap-2">
                <span className="font-black">{name}</span>
                <span>{value}</span>
              </div>
            ))}
          </div>
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

function VMScreen() {
  return (
    <section
      className="overflow-x-hidden flex flex-col relative border-4 border-primary "
      style={{
        minHeight: SCREEN_DIMENSIONS.height,
        minWidth: SCREEN_DIMENSIONS.width,
      }}
    >
      <div className="mr-20 flex justify-start items-start gap-1">
        <Button size="lg">
          <IterationCw className="mr-1 h-[1.2rem] w-[1.2rem]" />
          REFUND
        </Button>
        <ModeToggle />
      </div>
      <Header />
      <div className="flex-1">
        <Outlet />
      </div>
    </section>
  );
}

function App() {
  return (
   <main className="overflow-x-hidden h-[100vh] w-[100vw] flex justify-center">
      <div
        className="flex flex-col items-center gap-2"
        style={{ width: SCREEN_DIMENSIONS.width }}
      >
        screen:
        <VMScreen />
      </div>
    </main>
  );
}

export default App;

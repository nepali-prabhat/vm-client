import cans from "@/assets/images/cans.png";
import { Badge } from "./ui/badge";
import { STATS } from "@/constants";

function Stats() {
  return (
    <div className="py-1 px-2 flex items-center gap-4">
      {STATS.map(({ name, value }) => (
        <div key={`STAT_${name}`} className="flex gap-2">
          <span className="font-black">{name}</span>
          <span>{value}</span>
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

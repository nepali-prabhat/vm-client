import { ArrowBigDownDash, CircleSlash2, } from "lucide-react";
import coke from "@/assets/images/coca.png";
import { Button } from "@/components/ui/button";

const show = true;
export function VMDispenser() {
  return (
    <section className="">
      <div className="py-2 flex gap-2 justify-center items-center">
        <ArrowBigDownDash />
        <h3 className="text-xl font-black">Dispenser</h3>
      </div>
      <Button
        onClick={() => {
          console.log("grab the drink");
        }}
        variant="outline"
        className="w-[100%] h-[180px] p-2"
        disabled={!show}
      >
        <div className="flex flex-col gap-2 items-center justify-center">
          {!show ? (
            <>
              <CircleSlash2 className="" />
              Closed
            </>
          ) : (
            <div className="flex flex-col items-center justify-center gap-2">
              <img src={coke} width={"20%"} alt={`A can of ${name}`} />
                <span>Coins: 4</span>
                <span>Cash: NPR 3</span>
            </div>
          )}
        </div>
      </Button>
    </section>
  );
}

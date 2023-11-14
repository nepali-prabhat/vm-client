import { IterationCw } from "lucide-react";
import { Button } from "./ui/button";
import { ModeToggle } from "./mode-toggle";

function RefundButton() {
  return (
    <Button size="lg">
      <IterationCw className="mr-1 h-[1.2rem] w-[1.2rem]" />
      REFUND
    </Button>
  );
}

export function HeaderButtonsGroup() {
  return (
    <div className="mr-20 flex justify-start items-start gap-1">
      <RefundButton />
      <ModeToggle />
    </div>
  );
}

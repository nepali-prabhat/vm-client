import { Outlet } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { Header } from "@/components/header";
import { SCREEN_DIMENSIONS } from "@/constants";
import { IterationCw } from "lucide-react";

export default function VMScreen() {
  return (
    <section
      className="flex flex-col relative"
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
        <section
          className={"flex flex-col justify-center items-center gap-4 h-[100%]"}
        >
          <Outlet />
        </section>
      </div>
    </section>
  );
}

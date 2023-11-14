import { SCREEN_DIMENSIONS } from "@/constants";
import { Outlet } from "react-router-dom";
import { ModeToggle } from "./components/mode-toggle";

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
        <ModeToggle />
      </div>
      <div className="border-2 border-primary flex-1">
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

import { SCREEN_DIMENSIONS } from "@/constants";
import VMScreen from "./pages/screens/screens";


function App() {
  return (
   <main className="overflow-x-hidden h-[100vh] w-[100vw] flex justify-center">
      <div
        className="flex flex-col items-center gap-2"
        style={{ width: SCREEN_DIMENSIONS.width }}
      >
        <VMScreen />
      </div>
    </main>
  );
}

export default App;

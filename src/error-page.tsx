import { useRouteError } from "react-router-dom";
import { SCREEN_DIMENSIONS } from "./constants";
import { GlobalError } from "./components/globalError";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <main
      id="error-page"
      className="overflow-x-hidden h-[100vh] w-[100vw] flex justify-center"
    >
      <div
        className="flex flex-col justify-center items-center gap-2"
        style={{ width: SCREEN_DIMENSIONS.width }}
      >
        <GlobalError />
      </div>
    </main>
  );
}

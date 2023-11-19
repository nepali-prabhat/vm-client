import { useRouteError } from "react-router-dom";
import { SCREEN_DIMENSIONS } from "./constants";
import { Badge } from "@/components/ui/badge";

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
        <Badge className="text-3xl px-4 shadow-xl translate-x-5 -translate-y-4 truncate callout">
          Sorry, an unexpected error has occurred.
        </Badge>
      </div>
    </main>
  );
}

import { Badge } from "./ui/badge";

export function GlobalError() {
  return (
    <Badge className="text-3xl px-4 shadow-xl translate-x-5 -translate-y-4 truncate callout">
      Sorry, an unexpected error has occurred.
    </Badge>
  );
}

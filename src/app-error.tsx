import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "./components/ui/badge";
import { RotateCcw } from "lucide-react";

export default function AppError() {
  return (
    <div className="text-center">
      <Badge id="app-error-page" className="mb-4 text-lg -rotate-3">
        Sorry, unexpected error has occured
      </Badge>
      <br />
      <Button asChild variant="secondary" aria-label="reload button">
        <Link to="/">
          <RotateCcw />
        </Link>
      </Button>
    </div>
  );
}

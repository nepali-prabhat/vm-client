import { ModeToggle } from "./theme/mode-toggle";

export function HeaderButtonsGroup() {
  return (
    <div className="mr-20 flex justify-start items-start gap-1">
      <ModeToggle />
    </div>
  );
}

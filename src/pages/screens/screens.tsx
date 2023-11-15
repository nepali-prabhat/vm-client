// import { GlobalLoader } from "@/components/globalLoader";
import { Header } from "@/components/header";
import { HeaderButtonsGroup } from "@/components/header-buttons-group";
import { SCREEN_DIMENSIONS } from "@/constants";
import { Outlet } from "react-router-dom";

function VMScreenBody(props: React.PropsWithChildren) {
  return (
    <section
      className={"flex flex-col justify-center items-center gap-4 h-[100%]"}
    >
      {props.children}
    </section>
  );
}

export default function VMScreen() {
  return (
    <section
      className="flex flex-col relative"
      style={{
        minHeight: SCREEN_DIMENSIONS.height,
        minWidth: SCREEN_DIMENSIONS.width,
      }}
    >
      <HeaderButtonsGroup />
      <Header />
      <div className="flex-1">
        <VMScreenBody>
          <Outlet />
          {/* <GlobalLoader /> */}
        </VMScreenBody>
      </div>
    </section>
  );
}

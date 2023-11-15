import { Header } from "@/components/header";
import { HeaderButtonsGroup } from "@/components/header-buttons-group";
import { GlobalLoader } from "@/components/globalLoader";
import { SCREEN_DIMENSIONS } from "@/constants";
import { Suspense } from "react";
import { Await, Outlet, useLoaderData } from "react-router-dom";
import { GlobalError } from "@/components/globalError";

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
  const { state } = useLoaderData() as any;

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
          <Suspense fallback={<GlobalLoader />}>
            <Await resolve={state} errorElement={<GlobalError />}>
              {(resolvedState) => <Outlet context={resolvedState} />}
            </Await>
          </Suspense>
        </VMScreenBody>
      </div>
    </section>
  );
}

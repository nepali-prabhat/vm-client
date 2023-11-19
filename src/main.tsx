import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { RouterProvider } from "react-router-dom";

import { ThemeProvider } from "@/components/theme/theme-provider";
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { router } from "./router";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      throwOnError: true,
    },
  },
});
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <RouterProvider router={router} />
        {/* <ReactQueryDevtools position="bottom" initialIsOpen={false} /> */}
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);

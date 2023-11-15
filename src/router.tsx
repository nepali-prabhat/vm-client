import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import ErrorPage from "./error-page";
import { Drinks } from "./pages/screens/drinks";
import { Payment } from "./pages/screens/payment";
import { ResponsePage } from "./pages/screens/response";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Drinks />,
      },
      {
        path: "/:drinkId",
        element: <Payment />,
      },
      {
        path: "/:drinkId/:status",
        element: <ResponsePage />,
      },
    ],
  },
]);

import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import ErrorPage from "./error-page";
import { Drinks } from "./pages/screens/drinks";
import { Payment } from "./pages/screens/payment";
import AppError from "./app-error";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Drinks />,
        errorElement: <AppError />,
      },
      {
        path: "/:drinkId",
        element: <Payment />,
        errorElement: <AppError />,
      },
    ],
  },
]);

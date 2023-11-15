import { createBrowserRouter, defer } from "react-router-dom";
import App from "./App";
import ErrorPage from "./error-page";
import { Drinks } from "./pages/screens/drinks";
import { Payment } from "./pages/screens/payment";
import { Response } from "./pages/screens/response";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    loader: () => {
      // loaders can be async functions
      const state = new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve({
            items: [
              { id: 1, name: "pepsi", cost: 25 },
              { id: 2, name: "coke", cost: 20 },
              { id: 3, name: "dew", cost: 30 },
            ],
            stats: [
              { name: "Coins", value: 100 },
              { name: "Cash", value: 200 },
              { name: "Pepsi", value: 10 },
              { name: "Coke", value: 10 },
              { name: "Dew", value: 10 },
            ],
          });
        }, 2000);
      });

      return defer({ state });
    },
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
        element: <Response />,
      },
    ],
  },
]);

import { createBrowserRouter } from "react-router-dom";
import HomePage from "../src/pages/HomePage";
import NotFound from "../src/pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

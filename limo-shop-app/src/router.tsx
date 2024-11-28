import { createBrowserRouter } from "react-router-dom";
import { Home } from "./pages/HomePage/HomePage";
import { MainLayout } from "./common/layouts/MainLayout/MainLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [{ path: "", element: <Home /> }],
  },
]);

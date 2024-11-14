import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/home/Home";
import MainLayout from "./common/layouts/MainLayout/MainLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [{ path: "", element: <Home /> }],
  },
]);

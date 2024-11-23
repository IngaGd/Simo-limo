import { RouterProvider } from "react-router-dom";
import "./styles/main.scss";
import { router } from "./router";

export function App() {
  return <RouterProvider router={router} />;
}

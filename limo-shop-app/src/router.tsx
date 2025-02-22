import { createBrowserRouter } from "react-router-dom";

import { MainLayout } from "./common/layouts/MainLayout/MainLayout";
import { Home } from "./pages/Home/Home";
import { Items } from "./pages/Items";
import { Contacts } from "./pages/Contacts";
import { Cart } from "./pages/Cart";
import { Terms } from "./pages/Terms";
//import { Login } from "./pages/Login/Login";
//import { Purchasing } from "./pages/Purchasing/Purchasing";
import { PurchasingFormHook } from "./pages/Purchasing/PurchasingFormHook";
import { PaymentSuccess } from "./pages/PaymentSuccess/PaymentSuccess";
import { PaymentCansel } from "./pages/PaymentCansel";

const routes = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/items/:id", element: <Items /> },
      { path: "/contacts", element: <Contacts /> },
      { path: "/cart", element: <Cart /> },
      { path: "/terms", element: <Terms /> },
      //{ path: "/login", element: <Login /> },
      //{ path: "/purchasing", element: <Purchasing /> },
      { path: "/purchasing", element: <PurchasingFormHook /> },
      { path: "/payment-success", element: <PaymentSuccess /> },
      { path: "/payment-cansel", element: <PaymentCansel /> },
    ],
  },
];

export const router = createBrowserRouter(routes, {
  future: {
    v7_relativeSplatPath: true,
    v7_fetcherPersist: true,
    v7_normalizeFormMethod: true,
    v7_partialHydration: true,
    v7_skipActionErrorRevalidation: true,
  },
});

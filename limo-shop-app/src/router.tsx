import { createBrowserRouter } from "react-router-dom";

import { MainLayout } from "./common/layouts/MainLayout/MainLayout";
import { Items } from "./pages/Items";
import { Contacts } from "./pages/Contacts";
import { Cart } from "./pages/Cart";
import { Terms } from "./pages/Terms";
//import { Login } from "./pages/Login/Login";
//import { Purchasing } from "./pages/Purchasing/Purchasing";
import { PurchasingFormHook } from "./pages/Purchasing/PurchasingFormHook";
import { PaymentSuccess } from "./pages/PaymentSuccess/PaymentSuccess";
import { PaymentCancel } from "./pages/PaymentCancel";
import { PaymentLoading } from "./pages/PaymentLoading/PaymentLoading";
import { Policy } from "./pages/Policy/Policy";
import { lazy } from "react";
const Home = lazy(() => import("./pages/Home/Home"));

const routes = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/items/:category", element: <Items /> },
      { path: "/contacts", element: <Contacts /> },
      { path: "/cart", element: <Cart /> },
      { path: "/terms", element: <Terms /> },
      { path: "/privacy", element: <Policy /> },
      //{ path: "/login", element: <Login /> },
      //{ path: "/purchasing", element: <Purchasing /> },
      { path: "/purchasing", element: <PurchasingFormHook /> },
      { path: "/payment-loading", element: <PaymentLoading /> },
      { path: "/payment-success", element: <PaymentSuccess /> },
      { path: "/payment-cancel", element: <PaymentCancel /> },
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

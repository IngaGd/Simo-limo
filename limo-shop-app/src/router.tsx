import { createBrowserRouter } from "react-router-dom";
import { HomePage } from "./pages/HomePage/HomePage";
import { MainLayout } from "./common/layouts/MainLayout/MainLayout";
import { ItemsPage } from "./pages/ItemsPage";
import { ContactsPage } from "./pages/ContactsPage";
import { CartPage } from "./pages/CartPage";
import { TermsPage } from "./pages/TermsPage";

const routes = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/items/:id", element: <ItemsPage /> },
      { path: "/contacts", element: <ContactsPage /> },
      { path: "/cart", element: <CartPage /> },
      { path: "/terms", element: <TermsPage /> },
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

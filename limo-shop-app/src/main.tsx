import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App.tsx";
import { GlobalContextProvider } from "./common/context/GlobalContext.tsx";
import { GoogleOAuthProvider } from "@react-oauth/google";

const clientId = import.meta.env.VITE_CLIENT_ID;

createRoot(document.getElementById("root")!).render(
  <GoogleOAuthProvider clientId={clientId}>
    <GlobalContextProvider>
      <StrictMode>
        <App />
      </StrictMode>
    </GlobalContextProvider>
  </GoogleOAuthProvider>
);

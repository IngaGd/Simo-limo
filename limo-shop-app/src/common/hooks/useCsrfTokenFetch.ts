import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { GlobalContextType } from "../context/globalContext.types";

const URL = import.meta.env.VITE_URL;

export function useCsrfTokenFetch() {
  const { setNotification, setCsrfToken } = useContext(
    GlobalContext
  ) as GlobalContextType;

  const fetchCsrfToken = async () => {
    try {
      const response = await fetch(`${URL}csrf-token`, {
        method: "GET",
        credentials: "include",
      });
      if (!response.ok) {
        const errorResult = await response.json();
        setNotification({
          type: errorResult.type,
          status: errorResult.status,
          message: errorResult.message,
        });
        return;
      }
      const responseJson = await response.json();
      setCsrfToken(responseJson.csrfToken);
    } catch (error) {
      setNotification({
        type: "error",
        status: 500,
        message: "Sesija baigėsi, perkrauk puslapį.",
      });
    }
  };
  return { fetchCsrfToken };
}

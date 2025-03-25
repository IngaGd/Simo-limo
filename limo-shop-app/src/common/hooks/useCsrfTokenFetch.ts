import { useEffect, useState } from "react";

const URL = import.meta.env.VITE_URL;

export function useCsrfTokenFetch() {
  const [csrfToken, setCsrfToken] = useState("");

  useEffect(() => {
    const fetchCsrfToken = async () => {
      try {
        const response = await fetch(`${URL}csrf-token`, {
          method: "GET",
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error("Data failed fetch");
        }
        const responseJson = await response.json();
        setCsrfToken(responseJson.csrfToken);
      } catch (error) {
        console.log("Error: ", error);
      }
    };
    fetchCsrfToken();
  }, []);

  return { csrfToken };
}

import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { GlobalContextType } from "../context/globalContext.types";

const URL = import.meta.env.VITE_URL;

export function useGetPaymentStatus() {
  const [status, setStatus] = useState<string | null>(null);
  const { setNotification } = useContext(GlobalContext) as GlobalContextType;

  useEffect(() => {
    const intervalId = setInterval(async () => {
      try {
        const response = await fetch(`${URL}check-payment-status`, {
          method: "GET",
          credentials: "include",
        });
        if (!response.ok) {
          const errorData = await response.json();
          setNotification({
            type: errorData.type,
            message: errorData.message,
            status: errorData.status,
          });
          return;
        }
        const responseJson = await response.json();
        // if (!responseJson.status) {
        //   setNotification({
        //     type: "error",
        //     status: 400,
        //     message:
        //       "Nepavyko patikrinti mokėjimo būsenos. Pabandyk perkrauti puslapį arba susisiek su manim, jei problema išlieka.",
        //   });
        // }
        setStatus(responseJson.paymentStatus);
        if (
          responseJson.paymentStatus === "COMPLETED" ||
          responseJson.paymentStatus === "CANCELED" ||
          responseJson.paymentStatus === "EXPIRED"
        ) {
          clearInterval(intervalId);
        }
      } catch (error) {
        setNotification({
          status: 500,
          message: "Serverio klaida. Perkrauk puslapį arba bandyk vėliau.",
          type: "error",
        });
      }
    }, 3000);
    const timeOutId = setTimeout(() => {
      clearInterval(intervalId);
      setNotification({
        status: 408,
        type: "error",
        message:
          "Užklausa užtruko per ilgai. Patikrink, ar mokėjimas įvykdytas.",
      });
    }, 2 * 60 * 1000);

    return () => {
      clearInterval(intervalId);
      clearInterval(timeOutId);
    };
  }, []);

  return { status };
}

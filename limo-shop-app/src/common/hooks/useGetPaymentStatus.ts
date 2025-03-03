import { useEffect, useState } from "react";

const URL = import.meta.env.VITE_URL;

export function useGetPaymentStatus() {
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    const intervalId = setInterval(async () => {
      try {
        const response = await fetch(`${URL}check-payment-status`, {
          method: "GET",
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error("Data failed to fetch");
        }
        const responseJson = await response.json();
        console.log("useGetPaymentStatus responseJson: ", responseJson);
        setStatus(responseJson.paymentStatus);
        if (
          responseJson.paymentStatus === "COMPLETED" ||
          responseJson.paymentStatus === "CANCELED"
        ) {
          clearInterval(intervalId);
        }
      } catch (error) {
        console.error("Error: ", error);
      }
    }, 2000);

    return () => clearInterval(intervalId);
  }, []);

  return { status };
}

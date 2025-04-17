import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { GlobalContextType } from "../context/globalContext.types";

type ErrorResponseObject = {
  status: number;
  field?: string;
  message: string;
};

export type Notification = {
  type: "success" | "error";
  message: string;
  status?: number;
};

type ResponseObject = {
  status: number;
  message: string;
  paymentStatus?: string;
  redirectToPayment?: boolean;
  userIp?: string | null;
  redirectUrl?: string;
};

export function usePostData(url: string) {
  const [data, setData] = useState<Object | null>(null);
  const [response, setResponse] = useState<ResponseObject | null>(null);
  const { setNotification, setLoader } = useContext(
    GlobalContext
  ) as GlobalContextType;
  const [orderId, setOrderId] = useState<string>("");
  const [paymentStatus, setPaymentStatus] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<
    ErrorResponseObject[] | null
  >(null);

  useEffect(() => {
    const postData = async () => {
      if (!data) return;

      setLoader(true);

      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(data),
        });

        if (!response) return;

        if (response.ok) {
          const result = await response.json();
          setResponse({
            status: result.status,
            message: result.message,
            paymentStatus: result.paymentStatus,
            redirectToPayment: result.redirectToPayment,
            userIp: result.userIp,
            redirectUrl: result.redirectUrl,
          });
          setOrderId(result.orderId);
          setPaymentStatus(result.paymentStatus);
          setNotification({
            type: result.type,
            status: result.status,
            message: result.message,
          });
        } else {
          const errorResult = await response.json();
          if (Array.isArray(errorResult.errors)) {
            const errorArray = errorResult.errors.map(
              (errorsArray: { path: string; msg: string }) => {
                return {
                  status: response.status,
                  field: errorsArray.path,
                  message: errorsArray.msg,
                };
              }
            );
            setValidationError(errorArray);
          } else {
            setNotification({
              type: errorResult.type,
              status: errorResult.status,
              message: errorResult.message,
            });
          }
        }
      } catch (error) {
        console.error("Error: ", error);
        setNotification({
          type: "error",
          status: 500,
          message: "Tinklo klaida, perkrauk puslapį arba bandyk vėliau.",
        });
      } finally {
        setLoader(false);
      }
    };

    postData();
  }, [data]);

  return {
    setData,
    setResponse,
    validationError,
    response,
    orderId,
    paymentStatus,
    setNotification,
  };
}

import { useEffect, useState } from "react";

const URL = import.meta.env.VITE_URL;

export type ErrorResponseObject = {
  status: number;
  field: string;
  message: string;
};

export type ResponseObject = {
  status: number;
  message: string;
  redirectToPayment: boolean;
};

export function usePostData() {
  const orderUrl = `${URL}order`;
  const [data, setData] = useState<Object | null>(null);
  const [response, setResponse] = useState<ResponseObject | null>(null);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [paymentStatus, setPaymentStatus] = useState<string | null>(null);
  const [errorResponse, setErrorResponse] = useState<
    ErrorResponseObject[] | null
  >(null);

  useEffect(() => {
    const postData = async () => {
      if (!data) return;
      console.log("UseEffect data: ", data);

      try {
        const response = await fetch(orderUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        console.log("JSON.stringify(data):", JSON.stringify(data));

        if (!response) return;

        if (response.ok) {
          const result = await response.json();
          console.log("result", result.message);
          setResponse({
            status: result.status,
            message: result.message,
            redirectToPayment: result.redirectToPayment,
          });
          setOrderId(result.orderId);
          setPaymentStatus(result.paymentStatus);
        } else {
          const errorResult = await response.json();
          console.log("errorResult: ", errorResult);
          const errorObject = errorResult.errors.map(
            (errorsArray: { path: string; msg: string }) => {
              return {
                status: response.status,
                field: errorsArray.path,
                message: errorsArray.msg,
              };
            }
          );
          setErrorResponse(errorObject);
          console.log("setResponse: ", errorObject);
        }
      } catch (error) {
        console.error("Error: ", error);
      }
    };

    postData();
  }, [data]);

  return { setData, errorResponse, response, orderId, paymentStatus };
}

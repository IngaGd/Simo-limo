import { useEffect, useState } from "react";

type ErrorResponseObject = {
  status: number;
  field?: string;
  message: string;
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
  const [orderId, setOrderId] = useState<string>("");
  const [paymentStatus, setPaymentStatus] = useState<string | null>(null);
  const [errorResponse, setErrorResponse] = useState<
    ErrorResponseObject[] | null
  >(null);

  useEffect(() => {
    const postData = async () => {
      if (!data) return;

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
        } else {
          const errorResult = await response.json();
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
        }
      } catch (error) {
        console.error("Error: ", error);
      }
    };

    postData();
  }, [data]);

  return { setData, errorResponse, response, orderId, paymentStatus };
}

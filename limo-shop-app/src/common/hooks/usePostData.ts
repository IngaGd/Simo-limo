import { useEffect, useState } from "react";

type ErrorResponseObject = {
  status: number;
  field: string;
  message: string;
};

type ResponseObject = {
  status: number;
  message: string;
  paymentStatus?: string;
  redirectToPayment?: boolean;
  userIp?: string;
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
      console.log("UseEffect data: ", data);

      try {
        console.log(url);

        const response = await fetch(url, {
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
          console.log("result", result);
          setResponse({
            status: result.status,
            message: result.message,
            paymentStatus: result.paymentStatus,
            redirectToPayment: result.redirectToPayment,
            userIp: result.userIp,
            redirectUrl: result.redirectUrl,
          });
          console.log("UserIp: ", result.userIp);
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

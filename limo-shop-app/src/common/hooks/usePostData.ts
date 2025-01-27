import { useEffect, useState } from "react";

const URL = import.meta.env.VITE_URL;

export type ResponseObject = {
  status: number;
  field: string;
  message: string;
};

export function usePostData() {
  const orderUrl = `${URL}order`;
  const [data, setData] = useState<Object | null>(null);
  const [response, setResponse] = useState<Response | null>(null);
  console.log("Response in usePostData: ", response);

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

        if (response.ok) {
          const result = await response.json();
          console.log("result", result.message);
          // setResponse({ status: result.status, message: result.message });
        } else {
          const errorResult = await response.json();
          console.log("errorResult: ", errorResult);
          console.error("Error: ", errorResult.errors);
          const errorObject = errorResult.errors.map(
            (errorsArray: { path: string; msg: string }) => {
              return {
                status: response.status,
                field: errorsArray.path,
                message: errorsArray.msg,
              };
            }
          );
          setResponse(errorObject);
          console.log("setResponse: ", errorObject);
        }
      } catch (error) {
        console.error("Error: ", error);
      }
    };

    postData();
  }, [data]);

  return { setData, response };
}

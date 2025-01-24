import { useEffect, useState } from "react";

const URL = import.meta.env.VITE_URL;

export function usePostData() {
  const orderUrl = `${URL}order`;
  const [data, setData] = useState<Object | null>(null);
  const [response, setResponse] = useState<Object | null>(null);
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
          setResponse({ status: result.status, message: result.message });
        } else {
          console.error("Error: ", response.status, response.statusText);
        }
      } catch (error) {
        console.error("Error: ", error);
      }
    };

    postData();
  }, [data]);

  return { setData, response };
}

import { useEffect, useState } from "react";

const URL = import.meta.env.VITE_URL;

export function usePostData() {
  const orderUrl = `${URL}order`;
  const [data, setData] = useState<Object | null>(null);
  const [message, setMessage] = useState<String | null>(null);
  console.log("Message state: ", message);

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
          setMessage(result.message);
        } else {
          console.error("Error: ", response.status, response.statusText);
        }
      } catch (error) {
        console.error("Error: ", error);
      }
    };

    postData();
  }, [data]);

  return { setData, message };
}

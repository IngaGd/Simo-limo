import { useEffect, useState } from "react";

const URL = import.meta.env.VITE_URL;

export function usePostData() {
  const orderUrl = `${URL}order`;
  console.log(orderUrl);

  const [data, setData] = useState({});
  console.log("usePost data: ", data);

  useEffect(() => {
    const postData = async () => {
      if (!data) return;
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
          console.log("result", result);
        } else {
          console.error("Error: ", response.status, response.statusText);
        }
      } catch (error) {
        console.error("Error: ", error.message);
      }
    };
    postData();
  }, [data]);

  return { setData };
}

//{"products":[{"id":1,"title":"Dešimtinė juodo serbento","quantity":1,"totalPrice":30.99}],"purchaser":{"name":"Pineple","surName":"nana","email":"inga.gudaite@gmail.com","address":"Rinktinės 3A-77, Vilnius"},"termsConfirmed":true}

import { useContext, useEffect, useState } from "react";
// import { ProductListType } from "src/pages/Home/productList.types";
import { GlobalContext } from "../context/GlobalContext";
import { GlobalContextType } from "../context/globalContext.types";

export function useGetData<T>(url: string) {
  const { setNotification } = useContext(GlobalContext) as GlobalContextType;
  const [data, setData] = useState<T | null>(null);
  // const [products, setProducts] = useState<ProductListType>();
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(url, { method: "GET" });
        setLoader(true);
        if (!response.ok) {
          const errorData = await response.json();
          setNotification({
            type: errorData.type,
            message: errorData.message,
            status: errorData.status,
          });
          setLoader(false);
          return;
        }
        const responseJson = await response.json();
        setData(responseJson);
        setNotification(null);
      } catch (error) {
        setNotification({
          status: 500,
          message: "Nežinoma klaida. Bandykite dar kartą.",
          type: "error",
        });
      } finally {
        setLoader(false);
      }
    };
    getData();
  }, []);

  return { loader, data };
}

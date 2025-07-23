import { useContext, useEffect, useState } from "react";
// import { ProductListType } from "src/pages/Home/productList.types";
import { GlobalContext } from "../context/GlobalContext";
import { GlobalContextType } from "../context/globalContext.types";

const URL = import.meta.env.VITE_URL;

export function useHandleProductList() {
  const productsUrl = `${URL}products`;
  const { setNotification, setProducts } = useContext(
    GlobalContext
  ) as GlobalContextType;
  // const [products, setProducts] = useState<ProductListType>();
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    const getProductData = async () => {
      try {
        const response = await fetch(productsUrl, { method: "GET" });
        setLoader(true);
        if (!response.ok) {
          const errorData = await response.json();
          setNotification({
            type: errorData.type,
            message: errorData.message,
            status: errorData.status,
          });
          return;
        }
        const responseJson = await response.json();
        const productData = responseJson.map((column: string) => {
          return {
            id: parseInt(column[0]),
            title: column[1],
            imagePath: column[2],
            description: column[3],
            packageQty: Number(column[4]),
            packageUnitPrice: Number(column[5]),
            packageTotalPrice: Number(column[4]) * Number(column[5]),
            price: Number(column[6]),
            deliveryPrice: Number(column[7]),
            discountCode: column[8],
            discountValue: Number(column[9]),
            category: column[10],
            blurHash: column[11],
            stock: Number(column[12]),
          };
        });
        setProducts(productData);
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
    getProductData();
  }, []);

  return { loader };
}

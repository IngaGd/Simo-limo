import { useContext, useEffect, useState } from "react";
// import { ProductListType } from "src/pages/Home/productList.types";
import { GlobalContext } from "../context/GlobalContext";
import { GlobalContextType } from "../context/globalContext.types";

const URL = import.meta.env.VITE_URL;

export function useHandleProductList() {
  const productsUrl = `${URL}products`;
  const { setError, setProducts } = useContext(
    GlobalContext
  ) as GlobalContextType;
  // const [products, setProducts] = useState<ProductListType>();
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    const getProductData = async () => {
      try {
        const response = await fetch(productsUrl, { method: "GET" });
        if (!response.ok) {
          const errorData = await response.json();
          setError(errorData);
          return;
        }
        const responseJson = await response.json();
        setLoader(true);
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
          };
        });
        setProducts(productData);
        setError(null);
      } catch (error) {
        setError({
          status: 500,
          message: "Nežinoma klaida. Bandykite dar kartą.",
          location: "products",
        });
      } finally {
        setLoader(false);
      }
    };
    getProductData();
  }, []);

  return { loader };
}

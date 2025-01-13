import { useEffect, useState } from "react";
import { ProductListType } from "src/pages/Home/productList.types";

const URL = import.meta.env.VITE_URL;

export function useHandleProductList() {
  const productsUrl = `${URL}products`;
  const [products, setProducts] = useState<ProductListType>();

  useEffect(() => {
    const getProductData = async () => {
      try {
        const response = await fetch(productsUrl, { method: "GET" });
        if (!response.ok) {
          throw new Error("Data failed to fetch");
        }
        const responseJson = await response.json();
        const productData = responseJson.map((column: string) => {
          return {
            id: parseInt(column[0]),
            title: column[1],
            //imagePath: `${URL}${column[2]}`,
            imagePath: column[2],
            description: column[3],
            price: Number(column[4]),
          };
        });
        setProducts(productData);
      } catch (error) {
        console.log(error);
      }
    };
    getProductData();
  }, []);

  return { products };
}

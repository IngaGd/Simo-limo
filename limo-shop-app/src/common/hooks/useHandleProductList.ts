import { useEffect, useState } from "react";
import { ProductListType } from "src/pages/HomePage/productList.types";

const URL = import.meta.env.VITE_URL;

export function useHandleProductList() {
  const productsUrl = `${URL}products`;
  const [products, setProducts] = useState<ProductListType>();

  console.log("productList", products);

  useEffect(() => {
    const getProductData = async () => {
      try {
        const response = await fetch(productsUrl, { method: "GET" });
        if (!response.ok) {
          throw new Error("Response status: ", response.status);
        }
        const responseJson = await response.json();
        console.log("responseJson: ", responseJson);
        const productData = responseJson.map((row: string) => {
          return {
            id: parseInt(row[0]),
            title: row[1],
            imagePath: row[2],
            description: row[3],
            price: Number(row[4]),
          };
        });
        console.log("productData: ", productData);
        setProducts(productData);
      } catch (error) {
        console.log(error.message);
      }
    };
    getProductData();
  }, []);

  return { products };
}

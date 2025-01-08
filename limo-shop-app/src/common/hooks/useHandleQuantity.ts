import { useEffect, useState } from "react";
import { ProductObject } from "../components/Product/product.types";
import { QuantityType } from "../context/globalContext.types";

export function useHandleQuantity(products: ProductObject[] = []) {
  const [quantities, setQuantities] = useState<Array<QuantityType>>([]);

  useEffect(() => {
    products.length > 0
      ? setQuantities(products.map((product) => ({ id: product.id, qty: 1 })))
      : null;
  }, [products]);

  const handleIncrement = (id: number) => {
    setQuantities((prevQuantity) =>
      prevQuantity.map((q) => (q.id === id ? { ...q, qty: q.qty + 1 } : q))
    );
  };

  const handleDecrement = (id: number) => {
    setQuantities((prevQuantity) =>
      prevQuantity.map((q) =>
        q.id === id && q.qty > 1 ? { ...q, qty: q.qty - 1 } : q
      )
    );
  };

  return { quantities, handleIncrement, handleDecrement, setQuantities };
}

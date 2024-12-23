import { useState } from "react";
import { productList } from "src/assets/mok-data/productList";

export function useHandleQuantity() {
  const [quantities, setQuantities] = useState(
    productList.map((product) => ({ id: product.id, qty: 1 }))
  );

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

  return { quantities, handleIncrement, handleDecrement };
}

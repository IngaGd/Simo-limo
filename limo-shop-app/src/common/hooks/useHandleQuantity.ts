import { useState } from "react";

export function useHandleQuantity(
  productList: {
    id: number;
    title: string;
    imagePath: string;
    description: string;
    price: number;
  }[]
) {
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

  return { quantities, handleIncrement, handleDecrement, setQuantities };
}

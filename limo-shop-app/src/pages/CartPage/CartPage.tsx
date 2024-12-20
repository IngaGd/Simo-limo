import { useState } from "react";

export function CartPage() {
  const [items, setItems] = useState([
    // { id: 0, title: "", quantity: 0, totalPrice: 0 },
    { id: 1, title: "preke1", quantity: 4, totalPrice: 60 },
    { id: 2, title: "preke2", quantity: 8, totalPrice: 70 },
  ]);
  return (
    <div>
      <div>
        {items.map((item) => (
          <div key={item.id}>
            <div>{item.title}</div>
            <div>{item.quantity}</div>
            <div>{item.totalPrice}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

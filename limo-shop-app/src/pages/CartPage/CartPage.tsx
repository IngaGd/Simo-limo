import { useContext } from "react";
import { GlobalContext } from "src/common/context/GlobalContext";
import { GlobalContextType } from "src/common/context/globalContext.types";

export function CartPage() {
  const { cartItems } = useContext(GlobalContext) as GlobalContextType;

  return (
    <div>
      <div>
        Items:{" "}
        {cartItems.map((item) => (
          <div key={item.id} style={{ display: "flex" }}>
            <div>{item.title}</div>
            <div>{item.quantity}</div>
            <div>{item.totalPrice}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

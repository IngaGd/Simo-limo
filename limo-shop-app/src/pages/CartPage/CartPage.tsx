import { useContext } from "react";
import { Button } from "src/common/components/Button";
import { GlobalContext } from "src/common/context/GlobalContext";
import { GlobalContextType } from "src/common/context/globalContext.types";

const buttonText = "Pašalinti";

export function CartPage() {
  const { cartItems, removeItemFromCart } = useContext(
    GlobalContext
  ) as GlobalContextType;

  return (
    <div>
      <div>
        Items:{" "}
        {cartItems.map((item) => (
          <div key={item.id} style={{ display: "flex" }}>
            <div>{item.title}</div>
            <div>{item.quantity}</div>
            <div>{item.totalPrice}</div>
            <div onClick={() => removeItemFromCart(item.id)}>Remove</div>
            <Button
              buttonLabel={buttonText}
              handleClick={() => removeItemFromCart(item.id)}
            />
          </div>
        ))}
      </div>
      <div>Pirkti</div>
      <div>Išvalyti</div>
    </div>
  );
}

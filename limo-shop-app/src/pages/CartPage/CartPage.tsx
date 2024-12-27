import { useContext } from "react";
import { Button } from "src/common/components/Button";
import { GlobalContext } from "src/common/context/GlobalContext";
import { GlobalContextType } from "src/common/context/globalContext.types";

const buttonText1 = "Pašalinti";
const buttonText2 = "Pirkti";
const buttonText3 = "Išvalyti";

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
            <Button
              buttonLabel={buttonText1}
              handleClick={() => removeItemFromCart(item.id)}
            />
          </div>
        ))}
      </div>
      <Button buttonLabel={buttonText2} />
      <Button buttonLabel={buttonText3} />
    </div>
  );
}

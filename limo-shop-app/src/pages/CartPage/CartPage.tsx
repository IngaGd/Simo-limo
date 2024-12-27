import { useContext } from "react";
import { Button } from "src/common/components/Button";
import { GlobalContext } from "src/common/context/GlobalContext";
import { GlobalContextType } from "src/common/context/globalContext.types";

const buttonText1 = "Pašalinti";
const buttonText2 = "Pirkti";
const buttonText3 = "Išvalyti";
const plusIcon = "+";
const minusIcon = "-";

export function CartPage() {
  const {
    cartItems,
    removeItemFromCart,
    handleIncrementCartItem,
    handleDecrementCartItem,
  } = useContext(GlobalContext) as GlobalContextType;

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
            <div
              onClick={() => handleIncrementCartItem(item.id)}
              style={{
                width: "50px",
                border: "1px solid black",
                cursor: "pointer",
              }}
            >
              {plusIcon}
            </div>
            <div
              onClick={() => handleDecrementCartItem(item.id)}
              style={{
                width: "50px",
                border: "1px solid black",
                cursor: "pointer",
              }}
            >
              {minusIcon}
            </div>
          </div>
        ))}
      </div>
      <Button buttonLabel={buttonText2} />
      <Button buttonLabel={buttonText3} />
    </div>
  );
}

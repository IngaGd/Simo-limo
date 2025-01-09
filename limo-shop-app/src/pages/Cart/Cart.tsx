import { useContext } from "react";
import { Link } from "react-router-dom";
import { Button } from "src/common/components/Button";
import { Container } from "src/common/components/Container";
import { ContainerType } from "src/common/components/Container/container.types";
import { Image } from "src/common/components/Image";
import { GlobalContext } from "src/common/context/GlobalContext";
import { GlobalContextType } from "src/common/context/globalContext.types";

const buttonText1 = "Pašalinti";
const buttonText2 = "Pirkti";
const buttonText3 = "Išvalyti";
const plusIcon = "+";
const minusIcon = "-";

export function Cart() {
  const {
    cartItems,
    removeItemFromCart,
    handleIncrementCartItem,
    handleDecrementCartItem,
    handleEmptyTheCart,
  } = useContext(GlobalContext) as GlobalContextType;

  return (
    <div>
      {cartItems.length > 0 ? (
        <div>
          Items:{" "}
          {cartItems.map((item) => (
            <div key={item.id} style={{ display: "flex" }}>
              <Container containerType={ContainerType.ImageOfItem}>
                <Image imagePath={item.imagePath} />
              </Container>
              <div>{item.title}</div>
              <div>{item.quantity}</div>
              <div>{item.price * item.quantity}</div>
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
          <Link to="/purchasing">FORMUPTI UŽSAKYMĄ</Link>
          <Button
            buttonLabel={buttonText3}
            handleClick={() => handleEmptyTheCart()}
          />
        </div>
      ) : (
        <div>Krepšelis yra tuščias</div>
      )}
    </div>
  );
}

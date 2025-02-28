import { useContext } from "react";
import { Link } from "react-router-dom";
import { Button } from "src/common/components/Button";
import { Container } from "src/common/components/Container";
import { ContainerType } from "src/common/components/Container/container.types";
import { Image } from "src/common/components/Image";
import { GlobalContext } from "src/common/context/GlobalContext";
import { GlobalContextType } from "src/common/context/globalContext.types";
import styles from "./cart.module.scss";

const buttonText1 = "Pašalinti";
const buttonText2 = "Išvalyti";
const buttonText3 = "Formuoti užsakymą";
const plusIcon = "+";
const minusIcon = "-";
const cartIsEmpty = "Krepšelis yra tuščias";
const quantity = "Kiekis vnt.";
const price = "Kaina iš viso EUR";

export function Cart() {
  const {
    cartItems,
    removeItemFromCart,
    handleIncrementCartItem,
    handleDecrementCartItem,
    handleEmptyTheCart,
  } = useContext(GlobalContext) as GlobalContextType;

  const items = "Prekės";

  return (
    <div className={styles.cart}>
      {cartItems.length > 0 ? (
        <div className={styles.list}>
          {items}:{" "}
          {cartItems.map((item) => (
            <div key={item.id} className={styles.item}>
              <Container containerType={ContainerType.ImageOfCart}>
                <Image imagePath={item.imagePath} />
              </Container>
              <div className={styles.description}>
                <div className={styles.title}>
                  <div>{item.title}</div>
                </div>
                <div>
                  <div>
                    {quantity}: {item.quantity}
                  </div>
                  <div>
                    {price}: {item.price * item.quantity}
                  </div>
                </div>
              </div>
              <div className={styles.btn}>
                <div className={styles.btnCount}>
                  <Button
                    buttonLabel={plusIcon}
                    handleClick={() => handleIncrementCartItem(item.id)}
                  />
                  <Button
                    buttonLabel={minusIcon}
                    handleClick={() => handleDecrementCartItem(item.id)}
                  />
                </div>
                <Button
                  buttonLabel={buttonText1}
                  handleClick={() => removeItemFromCart(item.id)}
                />
              </div>
            </div>
          ))}
          <Link to="/purchasing" className={styles.link}>
            {buttonText3}
          </Link>
          <div className={styles.removeCart}>
            <Button
              buttonLabel={buttonText2}
              handleClick={() => handleEmptyTheCart()}
            />
          </div>
        </div>
      ) : (
        <div>{cartIsEmpty}</div>
      )}
    </div>
  );
}

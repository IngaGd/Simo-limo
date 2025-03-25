import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "src/common/components/Button";
import { Container } from "src/common/components/Container";
import { ContainerType } from "src/common/components/Container/container.types";
import { Image } from "src/common/components/Image";
import { GlobalContext } from "src/common/context/GlobalContext";
import { GlobalContextType } from "src/common/context/globalContext.types";
import styles from "./cart.module.scss";
import { useHandleProductList } from "src/common/hooks/useHandleProductList";

const buttonText1 = "Pašalinti";
const buttonText2 = "Išvalyti";
const buttonText3 = "Formuoti užsakymą";
const buttonText4 = "Taikyti";
const plusIcon = "+";
const minusIcon = "-";
const cartIsEmpty = "Krepšelis yra tuščias";
const quantity = "Pakuočių kiekis vnt.";
const deposit = "Taros kaina";
const price = "Limonado kaina EUR";
const totalPrice = "Suma EUR";
const items = "Prekės";
const delivery = "Pristatymo kaina";

export function Cart() {
  const {
    cartItems,
    removeItemFromCart,
    handleIncrementCartItem,
    handleDecrementCartItem,
    handleEmptyTheCart,
    userDiscountValue,
    message,
    setUserDiscountCode,
    setUserDiscountValue,
    setMessage,
  } = useContext(GlobalContext) as GlobalContextType;
  const [userInputCode, setUserInputCode] = useState("");
  const { products } = useHandleProductList();

  const handleAddDiscount = () => {
    if (products && products[0].discountCode === userInputCode) {
      setUserDiscountCode(userInputCode);
      const discountValue = products[0].discountValue / 100;
      setUserDiscountValue(discountValue);
      setUserInputCode("");
      setMessage("Nuolaida pritaikyta");
    } else {
      setUserDiscountCode("");
      setUserDiscountValue(0);
      setMessage("Neteisingas nuolaidos kodas");
    }
  };

  const handleEmptyCartButtonClick = () => {
    handleEmptyTheCart();
    setUserDiscountCode("");
    setUserDiscountValue(0);
    setMessage("");
  };

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
                    {deposit}:{" "}
                    {(item.packageQty * 0.1 * item.quantity).toFixed(2)}
                  </div>
                  {userDiscountValue > 0 ? (
                    <div style={{ color: "red" }}>
                      {price}:{" "}
                      {(item.price * userDiscountValue * item.quantity).toFixed(
                        2
                      )}
                    </div>
                  ) : (
                    <div>
                      {price}: {item.price * item.quantity}
                    </div>
                  )}
                  <div>{delivery}: 3.5 Eur</div>
                  <div>
                    {totalPrice}:{" "}
                    {(
                      item.packageQty * 0.1 * item.quantity +
                      item.price * item.quantity +
                      3.5
                    ).toFixed(2)}
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
          <div>
            {message ? (
              <p style={{ color: "red" }}>{message}</p>
            ) : (
              <p>Suveskite nuolaidos kodą</p>
            )}
            <label htmlFor="">Nuolaidos kodas</label>
            <input
              type="text"
              value={userInputCode}
              onChange={(e) => setUserInputCode(e.target.value)}
            />
            <Button
              buttonLabel={buttonText4}
              handleClick={() => handleAddDiscount()}
            />
          </div>
          <Link to="/purchasing" className={styles.link}>
            {buttonText3}
          </Link>
          <div className={styles.removeCart}>
            <Button
              buttonLabel={buttonText2}
              handleClick={() => handleEmptyCartButtonClick()}
            />
          </div>
        </div>
      ) : (
        <div>{cartIsEmpty}</div>
      )}
    </div>
  );
}

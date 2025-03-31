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
const price = "Limonado kaina EUR";
const totalPrice = "Suma EUR";
const items = "Prekės";
const delivery = "Pristatymo kaina EUR";
const linkText = "Eiti į parduotuvę";
const paymentPrice = "Suma apmokėjimui EUR";

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
    amount,
    imageIsLoaded,
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
    <div
      className={`${styles.cart} ${
        imageIsLoaded ? styles.visible : styles.hidden
      }`}
    >
      {cartItems.length > 0 ? (
        <div className={styles.list}>
          <div>{items}:</div>
          {cartItems.map((item) => (
            <div key={item.id} className={styles.item}>
              <div className={styles.imageContainer}>
                <Container containerType={ContainerType.ImageOfCart}>
                  <Image imagePath={item.imagePath} />
                </Container>
              </div>
              <div className={styles.description}>
                <div className={styles.title}>
                  <div>{item.title}</div>
                </div>
                <div className={styles.detailsContainer}>
                  <div className={styles.details}>
                    <div>{quantity}: </div>
                    <div>{item.quantity}</div>
                  </div>
                  {userDiscountValue > 0 ? (
                    <div className={styles.details}>
                      <div> {price}:</div>
                      <div className={styles.discountPrice}>
                        {(
                          item.price *
                          userDiscountValue *
                          item.quantity
                        ).toFixed(2)}
                      </div>
                    </div>
                  ) : (
                    <div className={styles.details}>
                      <div>{price}:</div>
                      <div>{(item.price * item.quantity).toFixed(2)}</div>
                    </div>
                  )}
                  <div className={`${styles.details} ${styles.deposit}`}>
                    <div>
                      Taros depozito mokestis EUR (
                      {item.packageQty * item.quantity} but. X 0.1 EUR):
                    </div>
                    <div className={styles.depositPrice}>
                      {Number(item.packageTotalPrice * item.quantity).toFixed(
                        2
                      )}
                    </div>
                  </div>
                  <div className={styles.details}>
                    <div>{delivery}:</div>
                    <div> {item.deliveryPrice.toFixed(2)}</div>
                  </div>
                  <div className={styles.details}>
                    <div>{totalPrice}:</div>
                    {userDiscountValue > 0 ? (
                      <div>
                        {(
                          item.packageTotalPrice * item.quantity +
                          item.price * userDiscountValue * item.quantity +
                          item.deliveryPrice
                        ).toFixed(2)}
                      </div>
                    ) : (
                      <div>
                        {(
                          item.packageTotalPrice * item.quantity +
                          item.price * item.quantity +
                          item.deliveryPrice
                        ).toFixed(2)}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className={styles.btn}>
                <div className={styles.btnCount}>
                  <Button
                    colorMode="grey"
                    buttonLabel={plusIcon}
                    handleClick={() => handleIncrementCartItem(item.id)}
                  />
                  <Button
                    colorMode="grey"
                    buttonLabel={minusIcon}
                    handleClick={() => handleDecrementCartItem(item.id)}
                  />
                </div>
                <Button
                  colorMode="grey"
                  buttonLabel={buttonText1}
                  handleClick={() => removeItemFromCart(item.id)}
                />
              </div>
            </div>
          ))}
          <div className={styles.priceDetails}>
            <div>{paymentPrice}</div>
            <div className={styles.amount}>{amount} </div>
          </div>
          <div className={styles.discount}>
            {message ? (
              <p style={{ color: "red" }}>{message}</p>
            ) : (
              <p>Suveskite nuolaidos kodą</p>
            )}
            <div>
              <div>
                <label htmlFor="discount">Nuolaidos kodas</label>
                <input
                  id="discount"
                  type="text"
                  value={userInputCode}
                  onChange={(e) => setUserInputCode(e.target.value)}
                />
              </div>
              <Button
                colorMode="grey"
                buttonLabel={buttonText4}
                handleClick={() => handleAddDiscount()}
              />
            </div>
          </div>
          <Link to="/purchasing" className={styles.link}>
            {buttonText3}
          </Link>
          <div className={styles.removeCart}>
            <Button
              colorMode="grey"
              buttonLabel={buttonText2}
              handleClick={() => handleEmptyCartButtonClick()}
            />
          </div>
        </div>
      ) : (
        <div className={styles.emptyCart}>
          <div>{cartIsEmpty}</div>
          <Link to="/" className={styles.link}>
            {linkText}
          </Link>
        </div>
      )}
    </div>
  );
}

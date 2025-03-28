import { useContext, useEffect } from "react";
import { Container } from "src/common/components/Container";
import { ContainerType } from "src/common/components/Container/container.types";
import { Image } from "src/common/components/Image";
import { GlobalContext } from "src/common/context/GlobalContext";
import { GlobalContextType } from "src/common/context/globalContext.types";
import { usePostData } from "src/common/hooks/usePostData";
import styles from "./checkout.module.scss";
import { Button } from "src/common/components/Button";

type CheckoutObject = {
  message: string;
  orderId: string;
  userIp: string | null | undefined;
};

const URL = import.meta.env.VITE_URL;
const quantity = "Kiekis vnt.";
const price = "Kaina iš viso EUR";
const totalPrice = "Suma EUR";
const items = "Prekės";
const delivery = "Pristatymo kaina EUR";
const buttonText = "Apmokėti";

export function Checkout({ message, orderId, userIp }: CheckoutObject) {
  const checkoutUrl = `${URL}create-transaction`;

  const { cartItems, amount, userDiscountCode, userDiscountValue } = useContext(
    GlobalContext
  ) as GlobalContextType;

  const { setData, response } = usePostData(checkoutUrl);

  const handleClick = () => {
    const tarnsactionData = {
      amount: amount,
      currency: "EUR",
      reference: orderId,
    };
    const user = { userIp: userIp };
    setData({ tarnsactionData, user });
  };

  useEffect(() => {
    if (response?.redirectUrl) {
      window.location.href = response?.redirectUrl;
    }
  }, [response]);

  return (
    <div className={styles.checkout}>
      <div className={styles.message}>{message}</div>
      <div className={styles.cart}>
        <div className={styles.list}>
          <div className={styles.title}>{items}</div>
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
                      Taros depozito mokestis EUR ({item.packageQty} but. X 0.1
                      EUR):
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
            </div>
          ))}
          <div className={styles.btn}>
            <div>
              <div className={styles.amount}>Suma apmokėti: {amount} EUR</div>
              {userDiscountValue > 0 && userDiscountCode && (
                <div className={styles.discount}>
                  Suma apmokėti su nuolaida: {amount} EUR
                </div>
              )}
            </div>
            <Button
              colorMode="dark"
              buttonLabel={buttonText}
              handleClick={handleClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

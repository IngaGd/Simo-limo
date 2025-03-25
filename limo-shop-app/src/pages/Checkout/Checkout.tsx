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
  amount?: string;
  userIp: string | null | undefined;
};

const URL = import.meta.env.VITE_URL;
const quantity = "Kiekis vnt.";
const price = "Kaina iš viso EUR";
const items = "Prekės";
const buttonText = "Apmokėti";

export function Checkout({ message, orderId, amount, userIp }: CheckoutObject) {
  const checkoutUrl = `${URL}create-transaction`;

  const { cartItems, userDiscountCode, userDiscountValue } = useContext(
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

  const totalSum = cartItems
    .map((product) => product.price)
    .reduce((a, b) => a + b)
    .toFixed(2)
    .toString();

  return (
    <div className={styles.checkout}>
      <div className={styles.message}>{message}</div>
      <div className={styles.cart}>
        <div>{items}:</div>
        {cartItems.map((item) => (
          <div key={item.id} className={styles.item}>
            <Container containerType={ContainerType.ImageOfChechout}>
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
          </div>
        ))}
      </div>
      <div className={styles.btn}>
        <div>
          <div className={styles.amount}>Suma: {totalSum} EUR</div>
          {userDiscountValue > 0 && userDiscountCode && (
            <div className={styles.discount}>
              Suma su nuolaida: {amount} EUR
            </div>
          )}
        </div>
        <Button buttonLabel={buttonText} handleClick={handleClick} />
      </div>
    </div>
  );
}

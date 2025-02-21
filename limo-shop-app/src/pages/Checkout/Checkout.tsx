import { useEffect } from "react";
import { usePostData } from "src/common/hooks/usePostData";

type CheckoutObject = {
  message: string;
  orderId: string;
  amount?: string;
  userIp: string;
};

const URL = import.meta.env.VITE_URL;

export function Checkout({ message, orderId, amount, userIp }: CheckoutObject) {
  const checkoutUrl = `${URL}create-transaction`;
  console.log("checkoutUrl: ", checkoutUrl);

  console.log("order id in checkout: ", orderId);

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
      console.log("Redirecting to payment page:", response.redirectUrl);
      window.location.href = response?.redirectUrl;
    }
  }, [response]);

  return (
    <div>
      <div> {message}</div>
      <button onClick={() => handleClick()}>Pereiti prie apmokėjimo</button>
    </div>
  );
}

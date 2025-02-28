import { useContext, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { GlobalContext } from "src/common/context/GlobalContext";
import { GlobalContextType } from "src/common/context/globalContext.types";
import { usePostData } from "src/common/hooks/usePostData";
import DOMPurify from "dompurify";
import { Checkout } from "../Checkout/Checkout";
import { validationOptions } from "./purchasing.logic";
import styles from "./purchasing.module.scss";

// const name = "Vardas";
// const surname = "Pavardė";
// const email = "El. paštas";
// const street = "Adresas";
type Purchaser = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  street: string;
  town: string;
  postCode: string;
  termsConfirmed: boolean;
};

type PurchasingInputs = {
  _csrf: string;
  products: {
    id: number;
    title: string;
    quantity: number;
    totalPrice: number;
  }[];
  purchaser: Purchaser;
  paymentStatus: string;
};

const URL = import.meta.env.VITE_URL;

export function PurchasingFormHook() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Purchaser>({
    mode: "onChange",
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      street: "",
      town: "",
      postCode: "",
      termsConfirmed: false,
    },
  });
  const orderUrl = `${URL}order`;

  const { cartItems } = useContext(GlobalContext) as GlobalContextType;
  const { setData, errorResponse, response, orderId } = usePostData(orderUrl);
  const [orderAmount, setOrderAmount] = useState<string | undefined>();
  const [order, setOrder] = useState<PurchasingInputs | null>(null);
  const [csrfToken, setCsrfToken] = useState("");

  const orderProduct = cartItems.map((item) => ({
    id: item.id,
    title: item.title,
    quantity: item.quantity,
    totalPrice: item.price * item.quantity,
  }));

  const validationRules = validationOptions();

  const onSubmit: SubmitHandler<Purchaser> = (data) => {
    const sanitizedData = {
      ...data,
      firstName: DOMPurify.sanitize(data.firstName),
      lastName: DOMPurify.sanitize(data.lastName),
      phone: DOMPurify.sanitize(data.phone),
      email: DOMPurify.sanitize(data.email),
      street: DOMPurify.sanitize(data.street),
      town: DOMPurify.sanitize(data.town),
      postCode: DOMPurify.sanitize(data.postCode),
      termsConfirmed: data.termsConfirmed,
    };
    setOrder({
      _csrf: csrfToken,
      products: orderProduct,
      purchaser: sanitizedData,
      paymentStatus: "pending",
    });
    console.log("Submitted Data:", order);
  };

  const amount = order?.products
    .map((product) => product.totalPrice)
    .reduce((a, b) => a + b)
    .toFixed(2)
    .toString();

  useEffect(() => {
    if (!order) return;
    setData(order);
    setOrderAmount(amount);
  }, [order]);

  useEffect(() => {
    const fetchCsrfToken = async () => {
      try {
        const response = await fetch(`${URL}csrf-token`, {
          method: "GET",
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error("Data failed fetch");
        }
        const responseJson = await response.json();
        setCsrfToken(responseJson.csrfToken);
      } catch (error) {
        console.log("Error: ", error);
      }
    };
    fetchCsrfToken();
  }, []);

  return (
    <div className={styles.content}>
      {response?.redirectToPayment === true ? (
        <Checkout
          message={response.message}
          orderId={orderId}
          amount={orderAmount}
          userIp={response.userIp}
        />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <input type="hidden" name="_csrf" value={csrfToken} />
          <div className={styles.heading}>
            Užpildykite kontaktinius duomenis
          </div>
          <div className={styles.input}>
            <label htmlFor="firstName">Vardas</label>
            <input
              id="firstName"
              type="text"
              autoComplete="on"
              {...register("firstName", validationRules.firstName)}
            />
            <p>{errors.firstName?.message}</p>
            <p>
              {
                errorResponse?.find((el) => el.field === "purchaser.firstName")
                  ?.message
              }
            </p>
          </div>
          <div className={styles.input}>
            <label htmlFor="lastName">Pavardė</label>
            <input
              id="lastName"
              type="text"
              autoComplete="on"
              {...register("lastName", validationRules.lastName)}
            />
            <p>{errors.lastName?.message}</p>
            <p>
              {
                errorResponse?.find((el) => el.field === "purchaser.lastName")
                  ?.message
              }
            </p>
          </div>
          <div className={styles.input}>
            <label htmlFor="phone">Telefono Nr.</label>
            <input
              id="phone"
              type="text"
              autoComplete="on"
              {...register("phone", validationRules.phone)}
            />
            <p>{errors.phone?.message}</p>
            <p>
              {
                errorResponse?.find((el) => el.field === "purchaser.phone")
                  ?.message
              }
            </p>
          </div>
          <div className={styles.input}>
            <label htmlFor="email">E-paštas</label>
            <input
              id="email"
              type="email"
              autoComplete="on"
              {...register("email", validationRules.email)}
            />
            <p>{errors.email?.message}</p>
            <p>
              {
                errorResponse?.find((el) => el.field === "purchaser.email")
                  ?.message
              }
            </p>
          </div>
          <div className={styles.input}>
            <label htmlFor="address">Gatvės pavadinimas</label>
            <input
              id="address"
              type="text"
              autoComplete="on"
              {...register("street", validationRules.street)}
            />
            <p>{errors.street?.message}</p>
            <p>
              {
                errorResponse?.find((el) => el.field === "purchaser.street")
                  ?.message
              }
            </p>
          </div>
          <div className={styles.input}>
            <label htmlFor="town">Miestas</label>
            <input
              id="town"
              type="text"
              autoComplete="on"
              {...register("town", validationRules.town)}
            />
            <p>{errors.town?.message}</p>
            <p>
              {
                errorResponse?.find((el) => el.field === "purchaser.town")
                  ?.message
              }
            </p>
          </div>
          <div className={styles.input}>
            <label htmlFor="postCode">Pašto kodas</label>
            <input
              id="postCode"
              type="text"
              autoComplete="on"
              {...register("postCode", validationRules.postCode)}
            />
            <p>{errors.postCode?.message}</p>
            <p>
              {
                errorResponse?.find((el) => el.field === "purchaser.postCode")
                  ?.message
              }
            </p>
          </div>
          <div>
            <div className={styles.checkbox}>
              <label htmlFor="terms">Sutinku su pirkimo sąlygomos</label>
              <input
                id="terms"
                type="checkbox"
                autoComplete="on"
                {...register("termsConfirmed", {
                  required:
                    "Prašome pažymtėti, kad sutinkate su pirkimo salygomis.",
                })}
                onChange={(e) => {
                  setValue("termsConfirmed", e.target.checked);
                }}
              />
            </div>
            <p>{errors.termsConfirmed?.message}</p>
          </div>
          <input type="submit" className={styles.btn} />

          {/* <button>Pereiti prie apmokėjimo</button> */}
        </form>
      )}
    </div>
  );
}

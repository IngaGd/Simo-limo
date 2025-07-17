import { useContext, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { GlobalContext } from "src/common/context/GlobalContext";
import { GlobalContextType } from "src/common/context/globalContext.types";
import { usePostData } from "src/common/hooks/usePostData";
import DOMPurify from "dompurify";
import { Checkout } from "../Checkout/Checkout";
import { validationOptions } from "./purchasing.logic";
import styles from "./purchasing.module.scss";
import { Link } from "react-router-dom";
import { useCsrfTokenFetch } from "src/common/hooks/useCsrfTokenFetch";
import { Notification } from "src/common/components/Notification/Notification";

// const name = "Vardas";
// const surname = "Pavardė";
// const email = "El. paštas";
// const address = "Adresas";
const buttonText = "Siųsti";

type Purchaser = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  address: string;
  town: string;
  postCode: string;
  discountCode: string;
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
  amountWithPVM: number;
  amountPVM: number;
  amountWithoutPVM: number;
  purchaser: Purchaser;
  discountCode: string;
  paymentStatus: string;
};

const URL = import.meta.env.VITE_URL;

export function PurchasingFormHook() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, touchedFields },
  } = useForm<Purchaser>({
    mode: "onTouched",
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      address: "",
      town: "",
      postCode: "",
      termsConfirmed: false,
    },
  });
  const orderUrl = `${URL}order`;

  const {
    csrfToken,
    // fetchCsrfToken,
    cartItems,
    amount,
    userDiscountCode,
    userDiscountValue,
    setNotification,
    notification,
  } = useContext(GlobalContext) as GlobalContextType;
  const { fetchCsrfToken } = useCsrfTokenFetch();
  // const { userDiscountCode, userDiscountValue } = useHandleDiscount();
  const { setData, validationError, response, orderId } = usePostData(orderUrl);
  const [order, setOrder] = useState<PurchasingInputs | null>(null);

  useEffect(() => {
    setNotification(null);
  }, [notification]);

  useEffect(() => {
    fetchCsrfToken();
  }, []);

  const orderProduct = cartItems.map((item) => ({
    id: item.id,
    title: item.title,
    quantity: item.quantity,
    price: item.price,
    totalPrice:
      userDiscountValue > 0
        ? item.price * userDiscountValue * item.quantity
        : item.price * item.quantity,
    packageTotalQty: item.packageQty * item.quantity,
    packageTotalPrice: item.packageQty * item.quantity * 0.1,
    deliveryPrice: item.deliveryPrice,
  }));

  const validationRules = validationOptions();

  const onSubmit: SubmitHandler<Purchaser> = (data) => {
    if (!csrfToken) {
      setNotification({
        type: "error",
        status: 403,
        message:
          "Nepavyko gauti saugumo ženklo. Pabandykite perkrauti puslapį.",
      });
      return;
    }
    const sanitizedData = {
      ...data,
      firstName: DOMPurify.sanitize(data.firstName),
      lastName: DOMPurify.sanitize(data.lastName),
      phone: DOMPurify.sanitize(data.phone),
      email: DOMPurify.sanitize(data.email),
      address: DOMPurify.sanitize(data.address),
      town: DOMPurify.sanitize(data.town),
      postCode: DOMPurify.sanitize(data.postCode),
      termsConfirmed: data.termsConfirmed,
    };
    setOrder({
      _csrf: csrfToken,
      products: orderProduct,
      amountWithPVM: Number(amount),
      amountPVM: Number(((Number(amount) * 21) / 121).toFixed(2)),
      amountWithoutPVM: Number((Number(amount) / 1.21).toFixed(2)),
      purchaser: sanitizedData,
      discountCode: userDiscountCode,
      paymentStatus: "pending",
    });
  };

  useEffect(() => {
    if (!order) return;
    setData(order);
  }, [order]);

  useEffect(() => {
    if (response?.status === 200) {
      setData(null);
    }
  }, [response]);

  return (
    <>
      {response?.redirectToPayment === true ? (
        <Checkout
          message={response.message}
          orderId={orderId}
          userIp={response.userIp}
        />
      ) : (
        <div className={styles.purchasing}>
          {notification?.type === "error" ? (
            <Notification
              message={notification?.message}
              type={notification?.type}
              size="line"
            />
          ) : null}
          <div className={styles.content}>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
              <input type="hidden" name="_csrf" value={csrfToken} />
              <div className={styles.heading}>
                Užpildyk kontaktinius duomenis
              </div>
              <div className={styles.input}>
                <label htmlFor="firstName">Vardas</label>
                <input
                  id="firstName"
                  type="text"
                  autoComplete="on"
                  {...register("firstName", validationRules.firstName)}
                />
                <p>{touchedFields.lastName && errors.firstName?.message}</p>
                <p>
                  {
                    validationError?.find(
                      (el) => el.field === "purchaser.firstName"
                    )?.message
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
                <p>{touchedFields.phone && errors.lastName?.message}</p>
                <p>
                  {
                    validationError?.find(
                      (el) => el.field === "purchaser.lastName"
                    )?.message
                  }
                </p>
              </div>
              <div className={styles.input}>
                <label htmlFor="phone">Telefono Nr.</label>
                <input
                  id="phone"
                  type="text"
                  autoComplete="on"
                  placeholder="+3706xxxxxxx"
                  {...register("phone", validationRules.phone)}
                />
                <p>{touchedFields.email && errors.phone?.message}</p>
                <p>
                  {
                    validationError?.find(
                      (el) => el.field === "purchaser.phone"
                    )?.message
                  }
                </p>
              </div>
              <div className={styles.input}>
                <label htmlFor="email">E-paštas</label>
                <input
                  id="email"
                  type="email"
                  autoComplete="on"
                  placeholder="pašto@adresas.lt"
                  {...register("email", validationRules.email)}
                />
                <p>{touchedFields.address && errors.email?.message}</p>
                <p>
                  {
                    validationError?.find(
                      (el) => el.field === "purchaser.email"
                    )?.message
                  }
                </p>
              </div>
              <div className={styles.input}>
                <label htmlFor="address">Pristatymo adresas</label>
                <input
                  id="address"
                  type="text"
                  autoComplete="on"
                  placeholder="Gatvė namo nr./buto nr."
                  {...register("address")}
                />
                <p>{touchedFields.town && errors.address?.message}</p>
                <p>
                  {
                    validationError?.find(
                      (el) => el.field === "purchaser.address"
                    )?.message
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
                <p>{touchedFields.postCode && errors.town?.message}</p>
                <p>
                  {
                    validationError?.find((el) => el.field === "purchaser.town")
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
                  placeholder="pvz.: 01234"
                  {...register("postCode")}
                />
                <p>
                  {touchedFields.termsConfirmed && errors.postCode?.message}
                </p>
                <p>
                  {
                    validationError?.find(
                      (el) => el.field === "purchaser.postCode"
                    )?.message
                  }
                </p>
              </div>
              <div>
                <div className={styles.checkbox}>
                  <label htmlFor="terms">
                    Sutinku su <Link to="/terms">pirkimo sąlygomis</Link> ir{" "}
                    <Link to="/privacy">privatumo politika</Link>.
                  </label>
                  <input
                    id="terms"
                    type="checkbox"
                    autoComplete="on"
                    {...register("termsConfirmed")}
                    onChange={(e) => {
                      setValue("termsConfirmed", e.target.checked);
                    }}
                  />
                </div>
                <p>{errors.termsConfirmed?.message}</p>
                <p>
                  {
                    validationError?.find(
                      (el) => el.field === "purchaser.termsConfirmed"
                    )?.message
                  }
                </p>
              </div>
              <button type="submit" className={styles.btn}>
                {buttonText}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

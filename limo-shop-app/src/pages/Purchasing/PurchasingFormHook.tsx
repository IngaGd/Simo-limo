import { useContext, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { GlobalContext } from "src/common/context/GlobalContext";
import { GlobalContextType } from "src/common/context/globalContext.types";
import { usePostData } from "src/common/hooks/usePostData";
import DOMPurify from "dompurify";
import { Checkout } from "../Checkout/Checkout";

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

  const orderProduct = cartItems.map((item) => ({
    id: item.id,
    title: item.title,
    quantity: item.quantity,
    totalPrice: item.price * item.quantity,
  }));

  const validationOptions = {
    firstName: {
      required: "Privalomas laukas",
      pattern: {
        value: /^[a-zA-ZąčęėįšųūžĄČĘĖĮŠŲŪŽ' -]+$/,
        message: "Pašalinkite negalimus simbolius, galimi - raidės, (-), (')",
      },
      minLength: { value: 2, message: "Vardas turi būti ne mažiau 2 raidžių." },
      maxLength: {
        value: 50,
        message: "Vardas turi būti ne daugiau 50 raidžių.",
      },
    },
    lastName: {
      required: "Privalomas laukas",
      pattern: {
        value: /^[a-zA-ZąčęėįšųūžĄČĘĖĮŠŲŪŽ' -]+$/,
        message: "Pašalinkite negalimus simbolius, galimi - raidės, (-), (')",
      },
      minLength: {
        value: 2,
        message: "Pavardė turi būti ne mažiau 2 raidžių.",
      },
      maxLength: {
        value: 50,
        message: "Pavardė turi būti ne daugiau 50 raidžių.",
      },
    },
    phone: {
      required: "Privalomas laukas",
      pattern: {
        value: /^\+?[0-9]{1,4}[0-9]{6,14}$/,
        message: "Telefono numerio pavyzdys (pavyzdys: +370656789).",
      },
    },
    email: {
      required: "Privalomas laukas",
      pattern: {
        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        message: "Neteisingai suvestas el. pašto adresas.",
      },
    },
    street: {
      required: "Privalomas laukas",
      pattern: {
        value: /^[a-zA-ZąčęėįšųūžĄČĘĖĮŠŲŪŽ' -]+$/,
        message: "Pašalinkite negalimus simbolius, galimi - raidės, (-), (')",
      },
      minLength: { value: 2, message: "Vardas turi būti ne mažiau 2 raidžių." },
      maxLength: {
        value: 50,
        message: "Gatvė turi būti ne daugiau 50 raidžių.",
      },
    },
    town: {
      required: "Privalomas laukas",
      pattern: {
        value: /^[a-zA-ZąčęėįšųūžĄČĘĖĮŠŲŪŽ' -]+$/,
        message: "Pašalinkite negalimus simbolius, galimi - raidės, (-), (')",
      },
      minLength: {
        value: 2,
        message: "Miestas turi būti ne mažiau 2 raidžių.",
      },
      maxLength: {
        value: 50,
        message: "Miestas turi būti ne daugiau 50 raidžių.",
      },
    },
    postCode: {
      required: "Privalomas laukas",
      pattern: {
        value: /^[A-Z]{2}\d{4,10}$/,
        message: "Pašto kodo pavyzdys LT01234",
      },
    },
  };

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
    if (response?.redirectToPayment === true) {
      setOrder(null);
    }
  }, [response]);

  return (
    <div>
      {response?.redirectToPayment === true ? (
        <Checkout
          message={response.message}
          orderId={orderId}
          amount={orderAmount}
          userIp={response.userIp}
        />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <div>
              <label>Vardas</label>
              <input
                type="text"
                {...register("firstName", validationOptions.firstName)}
              />
              <p>{errors.firstName?.message}</p>
              <p>
                {
                  errorResponse?.find(
                    (el) => el.field === "purchaser.firstName"
                  )?.message
                }
              </p>
            </div>
            <div>
              <label>Pavardė</label>
              <input
                type="text"
                {...register("lastName", validationOptions.lastName)}
              />
              <p>{errors.lastName?.message}</p>
              <p>
                {
                  errorResponse?.find((el) => el.field === "purchaser.lastName")
                    ?.message
                }
              </p>
            </div>
          </div>
          <div>
            <label>Telefono Nr.</label>
            <input
              type="text"
              {...register("phone", validationOptions.phone)}
            />
            <p>{errors.phone?.message}</p>
            <p>
              {
                errorResponse?.find((el) => el.field === "purchaser.phone")
                  ?.message
              }
            </p>
          </div>
          <div>
            <label>E-paštas</label>
            <input {...register("email", validationOptions.email)} />
            <p>{errors.email?.message}</p>
            <p>
              {
                errorResponse?.find((el) => el.field === "purchaser.email")
                  ?.message
              }
            </p>
          </div>
          <div>
            <label>Gatvės pavadinimas</label>
            <input
              type="text"
              {...register("street", validationOptions.street)}
            />
            <p>{errors.street?.message}</p>
            <p>
              {
                errorResponse?.find((el) => el.field === "purchaser.street")
                  ?.message
              }
            </p>
          </div>
          <div>
            <label>Miestas</label>
            <input type="text" {...register("town", validationOptions.town)} />
            <p>{errors.town?.message}</p>
            <p>
              {
                errorResponse?.find((el) => el.field === "purchaser.town")
                  ?.message
              }
            </p>
          </div>
          <div>
            <label>Pašto kodas</label>
            <input
              type="text"
              {...register("postCode", validationOptions.postCode)}
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
            <label>Sutinku su pirkimo sąlygomos</label>
            <input
              type="checkbox"
              {...register("termsConfirmed", {
                required:
                  "Prašome pažymtėti, kad sutinkate su pirkimo salygomis.",
              })}
              onChange={(e) => {
                setValue("termsConfirmed", e.target.checked);
              }}
            />
            <p>{errors.termsConfirmed?.message}</p>
          </div>
          <input type="submit" />

          {/* <button>Pereiti prie apmokėjimo</button> */}
        </form>
      )}
    </div>
  );
}

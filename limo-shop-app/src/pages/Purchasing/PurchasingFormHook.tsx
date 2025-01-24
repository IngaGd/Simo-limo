import { useContext, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { GlobalContext } from "src/common/context/GlobalContext";
import { GlobalContextType } from "src/common/context/globalContext.types";
import { usePostData } from "src/common/hooks/usePostData";

// const name = "Vardas";
// const surname = "Pavardė";
// const email = "El. paštas";
// const address = "Adresas";
type Purchaser = {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
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
};

export function PurchasingFormHook() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Purchaser>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      address: "",
      termsConfirmed: false,
    },
  });

  const { cartItems } = useContext(GlobalContext) as GlobalContextType;
  const { setData, response } = usePostData();
  console.log("Message in purchasing: ", response);

  //const [confirmTerms, setConfirmTerms] = useState(false);
  const [order, setOrder] = useState<PurchasingInputs | null>(null);
  //const [formSubmitSuccess, setFormSubmitSuccess] = useState(false);
  //const [formSubmitError, setFormSubmitError] = useState(false);

  //   const [purchaser, setPurchaser] = useState<Purchaser>({
  //     name: "",
  //     surname: "",
  //     email: "",
  //     address: "",
  //   });

  const orderProduct = cartItems.map((item) => ({
    id: item.id,
    title: item.title,
    quantity: item.quantity,
    totalPrice: item.price * item.quantity,
  }));

  //   const handleChange = (e: { target: { name: any; value: any } }) => {
  //     setPurchaser((currData) => {
  //       return { ...currData, [e.target.name]: e.target.value };
  //     });
  //   };

  const onSubmit: SubmitHandler<Purchaser> = (data) => {
    setOrder({
      products: orderProduct,
      purchaser: data,
    });
    console.log("Submitted Data:", order);
  };

  useEffect(() => {
    if (!order) return;
    setData(order);
  }, [order]);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <div>
            <label>Vardas</label>
            <input
              {...register("firstName", { required: "Privalomas laukas" })}
            />
            <p>{errors.firstName?.message}</p>
          </div>
          <div>
            <label>Pavardė</label>
            <input
              {...register("lastName", { required: "Privalomas laukas" })}
            />
            <p>{errors.firstName?.message}</p>
          </div>
        </div>
        <div>
          <label>E-paštas</label>
          <input {...register("email", { required: "Privalomas laukas" })} />
        </div>
        <div>
          <label>Pristatymo adresas</label>
          <input {...register("address", { required: "Privalomas laukas" })} />
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
              setValue("termsConfirmed", e.target.checked); // Update `terms` based on checkbox state
            }}
          />
          <p>{errors.termsConfirmed?.message}</p>
        </div>
        <input type="submit" />

        {/* <button>Pereiti prie apmokėjimo</button> */}
      </form>
    </div>
  );
}

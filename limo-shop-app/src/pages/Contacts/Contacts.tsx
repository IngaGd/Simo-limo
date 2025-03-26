import { SubmitHandler, useForm } from "react-hook-form";
import {
  IconInstagram,
  IconEmail,
  IconPhone,
} from "src/common/components/Icon";
// import { validationOptions } from "./purchasing.logic";
import DOMPurify from "dompurify";
import styles from "./contacts.module.scss";
import { validationOptions } from "../Purchasing/purchasing.logic";
import { useState } from "react";
import { useCsrfTokenFetch } from "src/common/hooks/useCsrfTokenFetch";

type UserMessage = {
  firstName: string;
  email: string;
  message: string;
};

type UserMessageInputs = {
  _csrf: string;
  inputs: UserMessage;
};

const buttonText = "Siųsti";

export function Contacts() {
  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm<UserMessage>({
  //   mode: "onChange",
  //   defaultValues: {
  //     firstName: "",
  //     email: "",
  //     message: "",
  //   },
  // });
  // const [userMessage, setUserMessage] = useState<UserMessageInputs | null>(
  //   null
  // );
  // const { csrfToken } = useCsrfTokenFetch();

  // const validationRules = validationOptions();

  // const onSubmit: SubmitHandler<UserMessage> = (data) => {
  //   const sanitizedData = {
  //     ...data,
  //     firstName: DOMPurify.sanitize(data.firstName),
  //     email: DOMPurify.sanitize(data.email),
  //     address: DOMPurify.sanitize(data.message),
  //   };
  //   setUserMessage({
  //     _csrf: csrfToken,
  //     inputs: sanitizedData,
  //   });
  // };

  return (
    <div className={styles.contacts}>
      <div className="heading-secondary">Kontaktai:</div>
      <div className={styles.links}>
        <a href="mailto:mbmaistas@gmail.com">
          <IconEmail size="medium" />
          mbmaistas@gmail.com
        </a>
        <a href="tel:+37069319891" className={styles.phone}>
          <IconPhone size="medium" />
          (+370) 693-19891
        </a>
        <a href="https://www.instagram.com/simo.delicatessen/" className="">
          <IconInstagram size="medium" />
          simo.delicatessen
        </a>
      </div>
      {/* <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <input type="hidden" name="_csrf" value={csrfToken} />
        <div className={styles.heading}>Užpildykite kontaktinius duomenis</div>
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
          <label htmlFor="address">Žinutė</label>
          <input
            id="address"
            type="text"
            autoComplete="on"
            {...register("address", validationRules.address)}
          />
          <p>{errors.address?.message}</p>
          <p>
            {
              errorResponse?.find((el) => el.field === "purchaser.address")
                ?.message
            }
          </p>
        </div>
        <button type="submit" className={styles.btn}>
          {buttonText}
        </button>
      </form> */}
      <div className={styles.address}>
        <address>
          Maistas, MB <br />
          Įmonės kodas: 305337184 <br />
          PVM kodas: LT100012777718 <br />
        </address>
      </div>
    </div>
  );
}

import DOMPurify from "dompurify";
import styles from "../../../pages/Purchasing/purchasing.module.scss";
import { SubmitHandler, useForm } from "react-hook-form";
import { validationOptions } from "src/pages/Purchasing/purchasing.logic";
import { useContext, useEffect, useState } from "react";
import { usePostData } from "src/common/hooks/usePostData";
import { GlobalContext } from "src/common/context/GlobalContext";
import { GlobalContextType } from "src/common/context/globalContext.types";
import { useCsrfTokenFetch } from "src/common/hooks/useCsrfTokenFetch";

const buttonText = "Siųsti";
const URL = import.meta.env.VITE_URL;

type UserMessage = {
  firstName: string;
  email: string;
  message: string;
};

type FormInputs = {
  _csrf: string;
  userMessage: UserMessage;
};

export function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
  } = useForm<UserMessage>({
    mode: "onSubmit",
    defaultValues: {
      email: "",
      message: "",
    },
  });
  const userMessageUrl = `${URL}user-message`;
  const [userMessage, setUserMessage] = useState<FormInputs | null>(null);
  const { csrfToken, fetchCsrfToken } = useContext(
    GlobalContext
  ) as GlobalContextType;
  const { setData } = usePostData(userMessageUrl);

  const validationRules = validationOptions();

  useEffect(() => {
    fetchCsrfToken();
  }, []);

  const onSubmit: SubmitHandler<UserMessage> = (data) => {
    const sanitizedData = {
      ...data,
      firstName: DOMPurify.sanitize(data.firstName),
      email: DOMPurify.sanitize(data.email),
      message: DOMPurify.sanitize(data.message),
    };
    setUserMessage({
      _csrf: csrfToken,
      userMessage: sanitizedData,
    });
  };

  useEffect(() => {
    if (!userMessage) return;
    setData(userMessage);
  }, [userMessage]);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <input type="hidden" name="_csrf" value={csrfToken} />
        <div className={styles.input}>
          <label htmlFor="firstName">Vardas</label>
          <input
            id="firstName"
            type="text"
            autoComplete="on"
            {...register("firstName", validationRules.firstName)}
          />
          <p>{errors.firstName?.message}</p>
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
          <p>{touchedFields.message && errors.email?.message}</p>
          {/* <p>
              {
                errorResponse?.find((el) => el.field === "purchaser.email")
                  ?.message
              }
            </p> */}
        </div>
        <div className={styles.input}>
          <label htmlFor="message">Žinutė</label>
          <textarea
            id="message"
            rows={6}
            {...register("message", validationRules.message)}
          />
          <p>{errors.message?.message}</p>
          {/* <p>
              {
                errorResponse?.find((el) => el.field === "purchaser.email")
                  ?.message
              }
            </p> */}
        </div>
        <button type="submit" className={styles.btn}>
          {buttonText}
        </button>
      </form>
    </div>
  );
}

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

type UserEmail = {
  firstName: string;
  email: string;
  message: string;
};

type FormInputs = {
  _csrf: string;
  userEmail: UserEmail;
};

export function EmailForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserEmail>({
    mode: "onSubmit",
    defaultValues: {
      email: "",
    },
  });
  const userEmailUrl = `${URL}user-subscription`;
  const [userEmail, setUserEmail] = useState<FormInputs | null>(null);
  const { fetchCsrfToken } = useCsrfTokenFetch();
  const { notification, loader, csrfToken, setNotification } = useContext(
    GlobalContext
  ) as GlobalContextType;
  const { setData } = usePostData(userEmailUrl);
  const validationRules = validationOptions();

  useEffect(() => {
    fetchCsrfToken();
  }, []);

  const onSubmit: SubmitHandler<UserEmail> = (data) => {
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
      email: DOMPurify.sanitize(data.email),
    };

    setUserEmail({
      _csrf: csrfToken,
      userEmail: sanitizedData,
    });
  };

  useEffect(() => {
    if (!userEmail) return;
    setData(userEmail);
  }, [userEmail]);

  useEffect(() => {
    if (loader || notification) {
      document.body.style.overflow = "hidden";
      if (notification?.type === "success") {
        reset();
        setUserEmail(null);
        setData(null);
      }
      const timeout = setTimeout(() => {
        setNotification(null);
      }, 2000);
      return () => clearTimeout(timeout);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [notification, loader]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <input type="hidden" name="_csrf" value={csrfToken} />
      <div className={styles.input}>
        <label htmlFor="email">E-paštas</label>
        <input
          id="email"
          type="email"
          autoComplete="on"
          placeholder="pašto@adresas.lt"
          {...register("email", validationRules.email)}
        />
        <p>{errors.email?.message}</p>
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
  );
}

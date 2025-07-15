import { useContext, useEffect } from "react";
import { EmailForm } from "../../EmailForm/EmailForm";
import styles from "./modal.module.scss";
import { GlobalContext } from "src/common/context/GlobalContext";
import { GlobalContextType } from "src/common/context/globalContext.types";
import { Loader } from "../../Loader/Loader";
import { Notification } from "../../Notification/Notification";
import { useElementPositionInView } from "src/common/hooks/useElementPositionInView";
import { IconClose } from "../../Icon";

export function EmailModal() {
  const {
    isVisible,
    setIsVisible,
    setEmailModal,
    notification,
    loader,
    setNotification,
  } = useContext(GlobalContext) as GlobalContextType;

  const { ref, deviceHeight } = useElementPositionInView();

  useEffect(() => {
    if (notification) {
      const timeout = setTimeout(() => {
        setNotification(null);
        setIsVisible(false);
        setEmailModal(false);
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [notification]);

  return (
    <>
      {loader ? (
        <Loader size="fullscreen" top={scrollY} height={deviceHeight} />
      ) : notification ? (
        <Notification
          message={notification?.message}
          type={notification?.type}
          size="fullscreen"
          top={scrollY}
          height={deviceHeight}
        />
      ) : (
        <div className={styles.modalEmail} ref={ref}>
          <div className={styles.close}>
            <button
              className={styles.btn}
              onClick={() => {
                setIsVisible(!isVisible);
                setEmailModal(false);
              }}
            >
              <IconClose size="medium" />
            </button>
          </div>
          <div className={styles.form}>
            <p>
              Kad vyktų smagūs dalykai, reikia kontakto. Palik savo el-paštą:
            </p>
            <EmailForm />
          </div>
        </div>
      )}
    </>
  );
}

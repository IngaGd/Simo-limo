import { EmailForm } from "src/common/components/EmailForm/EmailForm";
import styles from "./events.module.scss";
import { Loader } from "src/common/components/Loader/Loader";
import { useContext } from "react";
import { GlobalContext } from "src/common/context/GlobalContext";
import { GlobalContextType } from "src/common/context/globalContext.types";
import { useElementPositionInView } from "src/common/hooks/useElementPositionInView";
import { useScrollY } from "src/common/hooks/useScrollY";
import { Notification } from "src/common/components/Notification/Notification";

export function Events() {
  const { notification, loader } = useContext(
    GlobalContext
  ) as GlobalContextType;
  const { ref, deviceHeight } = useElementPositionInView();
  const scrollY = useScrollY();

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
      ) : null}
      <div className={styles.container} ref={ref}>
        <p>
          {" "}
          Gauk informaciją apie artimiausius renginius. Įvesk el. paštą,
          atsiųsiu naujienas.
        </p>
        <div className={styles.form}>
          <EmailForm />
        </div>
      </div>
    </>
  );
}

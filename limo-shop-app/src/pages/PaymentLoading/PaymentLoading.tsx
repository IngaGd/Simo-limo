import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "src/common/context/GlobalContext";
import { GlobalContextType } from "src/common/context/globalContext.types";
import { useGetPaymentStatus } from "src/common/hooks/useGetPaymentStatus";
import styles from "./loginPage.module.scss";
import { Loader } from "src/common/components/Loader/Loader";
import { Notification } from "src/common/components/Notification/Notification";

export function PaymentLoading() {
  const { handleEmptyTheCart, notification } = useContext(
    GlobalContext
  ) as GlobalContextType;
  const { status } = useGetPaymentStatus();
  const navigate = useNavigate();

  useEffect(() => {
    if (status === "COMPLETED") {
      handleEmptyTheCart();
      navigate("/payment-success");
    } else if (status === "CANCELLED" || status === "EXPIRED") {
      navigate("/payment-cancel", {
        state: {
          message:
            status === "EXPIRED"
              ? "Sesija baigėsi. Bandyk dar kartą."
              : "Apmokėjimas buvo nutrauktas",
        },
      });
    }
  }, [status]);

  return (
    <div className={styles.loadingPage}>
      {notification?.type === "error" ? (
        <Notification type="error" size="line" message={notification.message} />
      ) : (
        <>
          <p>Laukiu atsakymo iš banko, prašau dar neuždaryti šio lango.</p>
          <Loader />
        </>
      )}
    </div>
  );
}

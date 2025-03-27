import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "src/common/context/GlobalContext";
import { GlobalContextType } from "src/common/context/globalContext.types";
import { useGetPaymentStatus } from "src/common/hooks/useGetPaymentStatus";
import styles from "./loginPage.module.scss";

export function PaymentLoading() {
  const { handleEmptyTheCart } = useContext(GlobalContext) as GlobalContextType;
  const { status } = useGetPaymentStatus();
  const navigate = useNavigate();

  useEffect(() => {
    if (status === "COMPLETED") {
      handleEmptyTheCart();
      navigate("/payment-success");
    } else if (status === "CANCELLED") {
      navigate("/payment-cancel");
    }
  }, [status]);

  return (
    <div className={styles.loginPage}>
      Laukiu atsakymo iš banko, prašau dar neuždaryti šio lango.
    </div>
  );
}

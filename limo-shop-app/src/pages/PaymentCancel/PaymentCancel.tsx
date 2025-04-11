import { Link, useLocation } from "react-router-dom";
import styles from "./paymentCancel.module.scss";

// const text = "Apmokėjimas nepavyko";
const linkText = "Grįžti į krepšelį";

export function PaymentCancel() {
  const location = useLocation();
  const message = location.state?.message || "Apmokėjimas nepavyko";

  return (
    <div className={styles.cancelPage}>
      <h2>{message}</h2>
      <Link to="/cart" className={styles.link}>
        {linkText}
      </Link>
    </div>
  );
}

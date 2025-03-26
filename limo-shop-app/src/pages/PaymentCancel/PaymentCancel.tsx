import { Link } from "react-router-dom";
import styles from "./paymentCancel.module.scss";

const text = "Apmpkėjimas nepavyko";
const linkText = "Grįžti į krepšelį";

export function PaymentCancel() {
  return (
    <div className={styles.cancelPage}>
      <h2>{text}</h2>
      <Link to="/cart" className={styles.link}>
        {linkText}
      </Link>
    </div>
  );
}

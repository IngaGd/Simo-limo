import { Link } from "react-router-dom";
import styles from "./paymentSuccess.module.scss";

const text = "Užsakymas priimtas";
const linkText = "Grįžti į parduotuvę";

export function PaymentSuccess() {
  return (
    <div className={styles.successPage}>
      <h2>{text}</h2>
      <div>Ačiū. Mokėjimą gavau. Sąskaita išsiųsta nurodytu el paštu.</div>
      <Link to="/" className={styles.link}>
        {linkText}
      </Link>
    </div>
  );
}

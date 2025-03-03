import { Link } from "react-router-dom";

const text = "Užsakymas priimtas";
const linkText = "Grįžti į parduotuvę";

export function PaymentSuccess() {
  return (
    <div>
      <h2>{text}</h2>
      <Link to="/">{linkText}</Link>
    </div>
  );
}

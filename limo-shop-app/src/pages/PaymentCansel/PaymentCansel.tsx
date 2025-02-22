import { Link } from "react-router-dom";

const text = "Apmpkėjimas nepavyko";
const linkText = "Grįžti į krepšelį";

export function PaymentCansel() {
  return (
    <div>
      <h2>{text}</h2>
      <Link to="/cart">{linkText}</Link>
    </div>
  );
}

//import { useGetData } from "src/common/hooks/useGetData";
import { Link } from "react-router-dom";
//import { Button } from "src/common/components/Button";
//import { usePostData } from "src/common/hooks/usePostData";

//const URL = import.meta.env.VITE_RETURN_URL;

const text = "Užsakymas priimtas";
const linkText = "Grįžti į parduotuvę";

export function PaymentSuccess() {
  //   const { response } = usePostData(URL);
  //   console.log("PaymentSuccess:", URL);

  //if (!response) return;
  return (
    <div>
      <h2>{text}</h2>
      <Link to="/">{linkText}</Link>
    </div>
  );
}

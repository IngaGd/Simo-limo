import { Button } from "components/Button";
import styles from "./descriptionTableDropDown.module.scss";
import { Link } from "react-router-dom";
import { useState } from "react";
import { GroupTypes } from "../productGroup.types";

const text1 = "Kiekis";
const text2 = "Kaina";
const buttonText = "Pirkti";
const price = "30,89";
const currency = "Eur";
const plusIcon = "+";
const minusIcon = "-";

export function DescriptionTableDropDown({ group }: GroupTypes) {
  const [quantity, setQuantity] = useState<number>(1);

  const handleIncrement = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecrement = () => {
    if (quantity) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  return (
    <div className={`${styles.table}`}>
      <p className={`${styles.description}`}>{group.description}</p>
      <Link to={`/items/${group.id}`} className={styles.link}>
        Plačiau
      </Link>
      <div className={`${styles.purchasing}`}>
        <div className={`${styles.quantity}`}>
          <div> {text1}</div>
          <div className={`${styles.details}`}>
            <div>{quantity}</div>
            <div onClick={handleIncrement}>{plusIcon}</div>
            <div onClick={handleDecrement}>{minusIcon}</div>
          </div>
        </div>
        <div className={`${styles.price}`}>
          <div> {text2}</div>
          <div className={`${styles.details}`}>
            <div>{price}</div>
            <div>{currency}</div>
          </div>
        </div>
        <Button buttonLabel={buttonText} />
      </div>
    </div>
  );
}

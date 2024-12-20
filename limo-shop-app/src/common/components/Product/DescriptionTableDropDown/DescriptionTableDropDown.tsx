import { Button } from "components/Button";
import styles from "./descriptionTableDropDown.module.scss";
import { Link } from "react-router-dom";
import { ProductPropsTypes } from "../product.types";

const text1 = "Kiekis";
const text2 = "Kaina";
const buttonText = "Pirkti";
const currency = "Eur";
const plusIcon = "+";
const minusIcon = "-";

export function DescriptionTableDropDown({
  productList,
  addToCart,
  handleIncrement,
  productQuantity,
  handleDecrement,
}: ProductPropsTypes) {
  return (
    <div className={`${styles.table}`}>
      <p className={`${styles.description}`}>{productList.description}</p>
      <Link to={`/items/${productList.id}`} className={styles.link}>
        Plačiau
      </Link>
      <div className={`${styles.purchasing}`}>
        <div className={`${styles.quantity}`}>
          <div> {text1}</div>
          <div className={`${styles.details}`}>
            <div>{productQuantity}</div>
            <div onClick={handleIncrement}>{plusIcon}</div>
            <div onClick={handleDecrement}>{minusIcon}</div>
          </div>
        </div>
        <div className={`${styles.price}`}>
          <div> {text2}</div>
          <div className={`${styles.details}`}>
            <div>
              {productQuantity
                ? productQuantity * productList.price
                : productList.price}
            </div>
            <div>{currency}</div>
          </div>
        </div>
        <Button buttonLabel={buttonText} handleClick={addToCart} />
      </div>
    </div>
  );
}

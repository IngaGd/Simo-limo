import Button from "../Button/Button";
import styles from "./descriptionTableDropDown.module.scss";

const text1 =
  "10 buteliukų pakuotė. Fermentuotas juodųjų serbentų ir mėtų limonadas. Visi ingredientai lietuviški ir natūralūs.";
const text2 = "Kiekis";
const text3 = "Kaina";
const buttonText = "Pirkti";
const price = "30,89";
const quantity = "1";
const currency = "Eur";
const plusIcon = "+";

export default function DescriptionTableDropDown() {
  return (
    <div className={`${styles.table}`}>
      <p className={`${styles.description}`}>{text1}</p>
      <div className={`${styles.purchasing}`}>
        <div className={`${styles.quantity}`}>
          <div> {text2}</div>
          <div className={`${styles.details}`}>
            <div>{quantity}</div>
            <div>{plusIcon}</div>
          </div>
        </div>
        <div className={`${styles.price}`}>
          <div> {text3}</div>
          <div className={`${styles.details}`}>
            <div>{price}</div>
            <div>{currency}</div>
          </div>
        </div>
        <Button text={buttonText} />
      </div>
    </div>
  );
}

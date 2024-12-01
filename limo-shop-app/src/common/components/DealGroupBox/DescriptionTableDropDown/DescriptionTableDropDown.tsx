import { ButtonSecond } from "components/Button";
// import { IconThreeDots } from "../../Icon/Icon";
import styles from "./descriptionTableDropDown.module.scss";
import { DropDownProps } from "./descriptionTableDropDown.types";
import { Link } from "react-router-dom";

const text1 =
  "Exclusive limonadų asorti: šio mėnesio riboto leidimo kūriniai ir populiariausi gėrimai vienoje dešimties ";
const text2 = "Kiekis";
const text3 = "Kaina";
const buttonText = "Pirkti";
const price = "30,89";
const quantity = "1";
const currency = "Eur";
const plusIcon = "+";

export function DescriptionTableDropDown({ isActive }: DropDownProps) {
  return (
    <div className={isActive ? `${styles.active}` : `${styles.hidden}`}>
      <div className={`${styles.table}`}>
        <p className={`${styles.description}`}>{text1}</p>
        <Link to="/items" className={styles.link}>
          Plačiau
        </Link>
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
          <ButtonSecond text={buttonText} />
        </div>
      </div>
    </div>
  );
}

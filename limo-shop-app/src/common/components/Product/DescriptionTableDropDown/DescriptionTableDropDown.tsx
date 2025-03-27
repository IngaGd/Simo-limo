import { Button } from "components/Button";
import styles from "./descriptionTableDropDown.module.scss";
import { Link } from "react-router-dom";
import { GlobalContext } from "src/common/context/GlobalContext";
import { GlobalContextType } from "src/common/context/globalContext.types";
import { useContext } from "react";
import { DescriptionTableProps } from "./descriptionTableDropDown.types";
import { IconMinus, IconPlus } from "../../Icon";

const buttonText = "Pirkti";
const currency = "EUR";
const plusIcon = "+";
const minusIcon = "-";

export function DescriptionTableDropDown({
  product,
  handleIsActive,
}: DescriptionTableProps) {
  const {
    handleIncrement,
    handleDecrement,
    addToCart,
    quantities,
    setQuantities,
    handleImageToCart,
    resetImageToCart,
  } = useContext(GlobalContext) as GlobalContextType;

  const productQuantity =
    quantities.find((element) => element.id === product.id)?.qty || 1;

  const handleAddToCart = (p: {
    id: number;
    title: string;
    imagePath: string;
    description: string;
    packageQty: number;
    packageUnitPrice: number;
    price: number;
  }) => {
    addToCart(p);
    setQuantities(
      quantities.map((item) => {
        return {
          ...item,
          qty: 1,
        };
      })
    );
  };

  return (
    <div className={`${styles.table}`}>
      <p className={`${styles.description}`}>{product.description}</p>
      <Link to={`/items/${product.id}`} className={styles.link}>
        Plačiau
      </Link>
      <div className={`${styles.purchasing}`}>
        <div className={`${styles.quantity}`}>
          <div>Kiekis</div>
          <div className={styles.details}>
            <div>{productQuantity}</div>
            <div
              onClick={() => handleIncrement(product.id)}
              className={styles.iconBox}
            >
              <IconPlus size="medium" />
            </div>
            <div
              onClick={() => handleDecrement(product.id)}
              className={styles.iconBox}
            >
              <IconMinus size="medium" />
            </div>
          </div>
        </div>
        <div className={`${styles.price}`}>
          <div className={`${styles.details}`}>
            <div>{productQuantity * product.price}</div>
            <div>{currency}</div>
          </div>
        </div>
        {/* <div className={`${styles.price}`}>
          <div>Depozitas</div>
          <div>1 but.</div>
          <div className={`${styles.details}`}>
            <div>{product.packageUnitPrice}</div>
            <div>{currency}</div>
          </div>
        </div> */}
        <div className={styles.btn}>
          <Button
            buttonLabel={buttonText}
            handleClick={() => {
              handleAddToCart(product);
              handleIsActive();
              handleImageToCart();
              setTimeout(() => {
                resetImageToCart();
              }, 700);
            }}
          />
        </div>
      </div>
    </div>
  );
}

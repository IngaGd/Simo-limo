import { Button } from "components/Button";
import styles from "./descriptionTableDropDown.module.scss";
import { Link } from "react-router-dom";
import { GlobalContext } from "src/common/context/GlobalContext";
import { GlobalContextType } from "src/common/context/globalContext.types";
import { useContext, useState } from "react";
import { DescriptionTableProps } from "./descriptionTableDropDown.types";
// import { IconMinus, IconPlus } from "../../Icon";
import { ProductObject } from "../product.types";
import { useHandleProductList } from "src/common/hooks/useHandleProductList";

const buttonText = "Pirkti";
const currency = "EUR";

export function DescriptionTableDropDown({
  products,
  handleIsActive,
}: DescriptionTableProps) {
  const {
    // handleIncrement,
    // handleDecrement,
    addToCart,
    quantities,
    setQuantities,
    handleImageToCart,
    resetImageToCart,
    handleIsVisible,
    imageIsLoaded,
  } = useContext(GlobalContext) as GlobalContextType;
  const { loader } = useHandleProductList();
  const [product, setProduct] = useState<ProductObject>(products[0]);

  const productQuantity =
    quantities.find((element) => element.id === product.id)?.qty || 1;

  const handleAddToCart = (p: {
    id: number;
    title: string;
    imagePath: string;
    blurHash: string;
    description: string;
    price: number;
    packageQty: number;
    packageUnitPrice: number;
    packageTotalPrice: number;
    deliveryPrice: number;
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

  const handleProductSet = (p: ProductObject) => {
    setProduct(p);
  };

  return (
    <div
      className={`${styles.table}  ${
        !loader && imageIsLoaded ? styles.visible : ""
      }`}
    >
      <p className={`${styles.description}`}>{products[0].description}</p>
      <div className={styles.buttonLine}>
        <Link to={`/items/${products[0].category}`} className={styles.link}>
          Plačiau
        </Link>
      </div>
      {product ? (
        <div className={`${styles.purchasing}`}>
          <div className={styles.quantity}>
            {/* <div>Kiekis</div> */}
            {/* <div className={styles.details}> */}
            {/* <div>{productQuantity}</div>
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
              </div> */}
            <div className={styles.pakBtn}>
              {products?.map((p) => (
                // <Button
                //   key={p.id}
                //   colorMode="grey"
                //   buttonLabel={p.packageQty.toString().concat(" but.")}
                //   handleClick={() => handleProductSet(p)}
                // />
                <div onClick={() => handleProductSet(p)} key={p.id}>
                  {p.packageQty.toString().concat(" but.")}
                </div>
              ))}
            </div>
            {/* </div> */}
          </div>
          <div className={`${styles.price}`}>
            <div className={`${styles.details}`}>
              <div>{productQuantity * product.price}</div>
              <div>{currency}</div>
            </div>
          </div>
          <div className={styles.btn}>
            <Button
              colorMode="dark"
              buttonLabel={buttonText}
              handleClick={() => {
                handleAddToCart(product);
                handleIsActive();
                handleImageToCart();
                setTimeout(() => {
                  resetImageToCart();
                }, 700);
                handleIsVisible();
              }}
            />
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

import styles from "./homePage.module.scss";
import { Product } from "src/common/components/Product";
import { productList } from "../../assets/mok-data/productList";
import { useContext } from "react";
import { GlobalContext } from "src/common/context/GlobalContext";
import { GlobalContextType } from "src/common/context/globalContext.types";

export function HomePage() {
  const { quantities, handleIncrement, handleDecrement, addToCart } =
    useContext(GlobalContext) as GlobalContextType;

  return (
    <div className={styles.home}>
      {productList?.map((p) => (
        <div className={styles.box} key={p.id}>
          <Product
            productList={p}
            addToCart={() => addToCart(p)}
            handleIncrement={() => handleIncrement(p.id)}
            handleDecrement={() => handleDecrement(p.id)}
            productQuantity={
              quantities.find((element) => element.id === p.id)?.qty || 1
            }
          />
        </div>
      ))}
    </div>
  );
}

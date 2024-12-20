import styles from "./homePage.module.scss";
import { Product } from "src/common/components/Product";
import { productList } from "../../assets/mok-data/productList";
import { useState } from "react";
import { CartItemsType } from "src/common/components/Product/product.types";

export function HomePage() {
  const [cartItems, setCartItems] = useState<CartItemsType>([]);

  const [quantity, setQuantity] = useState(
    productList.map((product) => ({ id: product.id, qty: 1 }))
  );

  const handleIncrement = (id: number) => {
    setQuantity((prevQuantity) =>
      prevQuantity.map((q) => (q.id === id ? { ...q, qty: q.qty + 1 } : q))
    );
  };

  const handleDecrement = (id: number) => {
    setQuantity((prevQuantity) =>
      prevQuantity.map((q) =>
        q.id === id && q.qty > 1 ? { ...q, qty: q.qty - 1 } : q
      )
    );
  };

  const addToCart = (p: { id: number; title: string; price: string }) => {
    const cartItemQantity =
      quantity.find((element) => element.id === p.id)?.qty || 0;
    setCartItems((prevItems) => [
      ...prevItems,
      {
        id: p.id,
        title: p.title,
        quantity: cartItemQantity,
        totalPrice: cartItemQantity * Number(p.price),
      },
    ]);
  };

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
              quantity.find((element) => element.id === p.id)?.qty || 1
            }
          />
        </div>
      ))}
      <div>
        Items:{" "}
        {cartItems.map((item) => (
          <div key={item.id} style={{ display: "flex" }}>
            <div>{item.title}</div>
            <div>{item.quantity}</div>
            <div>{item.totalPrice}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

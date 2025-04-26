import { createContext, useState } from "react";
import {
  GlobalContextProviderProps,
  GlobalContextType,
  Notification,
} from "./globalContext.types";
import { useHandleCart } from "../hooks/useHandleCart";
import { useHandleQuantity } from "../hooks/useHandleQuantity";
//import { useHandleProductList } from "../hooks/useHandleProductList";
import { useImageToCart } from "../hooks/useImageToCart";
import { ProductListType } from "src/pages/Home/productList.types";

export const GlobalContext = createContext<GlobalContextType | null>(null);

export const GlobalContextProvider = ({
  children,
}: GlobalContextProviderProps) => {
  const [csrfToken, setCsrfToken] = useState("");
  const [notification, setNotification] = useState<Notification | null>(null);
  const [loader, setLoader] = useState(false);
  // const { products } = useHandleProductList();
  const [products, setProducts] = useState<ProductListType>([]);
  const { quantities, handleIncrement, handleDecrement, setQuantities } =
    useHandleQuantity(products);
  const {
    addToCart,
    cartItems,
    removeItemFromCart,
    handleIncrementCartItem,
    handleDecrementCartItem,
    handleEmptyTheCart,
  } = useHandleCart(quantities);
  const { imageToCart, handleImageToCart, resetImageToCart } = useImageToCart();
  const [userDiscountCode, setUserDiscountCode] = useState("");
  const [userDiscountValue, setUserDiscountValue] = useState(0);
  const [message, setMessage] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [imageIsLoaded, setImageIsLoaded] = useState(false);

  const amount =
    cartItems.length > 0
      ? cartItems
          .map((item) => ({
            totalPaymentPrice:
              item.deliveryPrice +
              item.packageTotalPrice * item.quantity +
              (userDiscountValue > 0
                ? userDiscountValue * item.price * item.quantity
                : item.price * item.quantity),
          }))
          .map((item) => item.totalPaymentPrice)
          .reduce((a, b) => a + b)
          .toFixed(2)
          .toString()
      : "";

  const handleIsVisible = () => {
    setIsVisible(!isVisible);
  };

  return (
    <GlobalContext.Provider
      value={{
        quantities,
        handleIncrement,
        handleDecrement,
        addToCart,
        cartItems,
        removeItemFromCart,
        setQuantities,
        handleIncrementCartItem,
        handleDecrementCartItem,
        handleEmptyTheCart,
        products,
        setProducts,
        handleImageToCart,
        imageToCart,
        resetImageToCart,
        userDiscountCode,
        userDiscountValue,
        setMessage,
        setUserDiscountValue,
        setUserDiscountCode,
        message,
        amount,
        isVisible,
        setIsVisible,
        handleIsVisible,
        notification,
        setNotification,
        csrfToken,
        setCsrfToken,
        loader,
        setLoader,
        imageIsLoaded,
        setImageIsLoaded,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

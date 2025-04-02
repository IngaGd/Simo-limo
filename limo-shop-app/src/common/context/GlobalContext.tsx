import { createContext, useState } from "react";
import {
  ErrorResponseObject,
  GlobalContextProviderProps,
  GlobalContextType,
} from "./globalContext.types";
import { useHandleCart } from "../hooks/useHandleCart";
import { useHandleQuantity } from "../hooks/useHandleQuantity";
//import { useHandleProductList } from "../hooks/useHandleProductList";
import { useImageToCart } from "../hooks/useImageToCart";
import { ProductListType } from "src/pages/Home/productList.types";
import { useCsrfTokenFetch } from "../hooks/useCsrfTokenFetch";

export const GlobalContext = createContext<GlobalContextType | null>(null);

export const GlobalContextProvider = ({
  children,
}: GlobalContextProviderProps) => {
  const [error, setError] = useState<ErrorResponseObject | null>(null);
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
  const [imageIsLoaded, setImageIsLoaded] = useState(false);
  const [footerIsVisible, setFooterIsVisible] = useState(false);
  const { csrfToken, fetchCsrfToken } = useCsrfTokenFetch();

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

  const handleLoad = () => {
    setImageIsLoaded(true);
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
        imageIsLoaded,
        setImageIsLoaded,
        footerIsVisible,
        setFooterIsVisible,
        handleLoad,
        error,
        setError,
        csrfToken,
        fetchCsrfToken,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

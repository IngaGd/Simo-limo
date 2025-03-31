import { createContext, useEffect, useState } from "react";
import {
  GlobalContextProviderProps,
  GlobalContextType,
} from "./globalContext.types";
import { useHandleCart } from "../hooks/useHandleCart";
import { useHandleQuantity } from "../hooks/useHandleQuantity";
import { useHandleProductList } from "../hooks/useHandleProductList";
import { useImageToCart } from "../hooks/useImageToCart";

export const GlobalContext = createContext<GlobalContextType | null>(null);

export const GlobalContextProvider = ({
  children,
}: GlobalContextProviderProps) => {
  const { products } = useHandleProductList();
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
  const [imageIsLoaded, setImageIsLoaded] = useState(0);
  const [imagesToLoad, setImagesToLoad] = useState(0);
  const [allImagesLoaded, setAllImagesLoaded] = useState(false);
  const [footerIsVisible, setFooterIsVisible] = useState(false);

  useEffect(() => {
    if (products) {
      setImagesToLoad(products.length);
      setImageIsLoaded((prev) => {
        const next = prev + 1;
        if (next === imagesToLoad) {
          setAllImagesLoaded(true);
        }
        return next;
      });
    }
  }, [products]);

  const handleLoad = () => {
    setImageIsLoaded((prev) => {
      const next = prev + 1;
      if (next === imagesToLoad) {
        setAllImagesLoaded(true);
      }
      return next;
    });
  };

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
        footerIsVisible,
        setFooterIsVisible,
        handleLoad,
        allImagesLoaded,
        imageIsLoaded,
        setAllImagesLoaded,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

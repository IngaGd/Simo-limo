import { ReactNode } from "react";
import { ProductListType } from "src/pages/Home/productList.types";

export type QuantityType = {
  id: number;
  qty: number;
};

export type CartItemType = {
  id: number;
  title: string;
  quantity: number;
  packageQty: number;
  price: number;
  imagePath: string;
  packageUnitPrice: number;
  packageTotalPrice: number;
  deliveryPrice: number;
};

export type CartItemsType = Array<CartItemType>;

export type Notification = {
  type: "success" | "error";
  message: string;
  status?: number;
};

export type GlobalContextType = {
  quantities: Array<QuantityType>;
  addToCart: (p: {
    id: number;
    title: string;
    imagePath: string;
    description: string;
    packageQty: number;
    packageUnitPrice: number;
    packageTotalPrice: number;
    deliveryPrice: number;
    price: number;
  }) => void;
  handleIncrement: (id: number) => void;
  handleDecrement: (id: number) => void;
  handleIncrementCartItem: (id: number) => void;
  handleDecrementCartItem: (id: number) => void;
  removeItemFromCart: (id: number) => void;
  setQuantities: (quantities: Array<QuantityType>) => void;
  handleEmptyTheCart: () => void;
  cartItems: CartItemsType;
  products: ProductListType;
  setProducts: React.Dispatch<React.SetStateAction<ProductListType>>;
  imageToCart: boolean;
  handleImageToCart: () => void;
  resetImageToCart: () => void;
  userDiscountCode: string;
  userDiscountValue: number;
  message: string;
  amount: string;
  setMessage: (input: string) => void;
  setUserDiscountValue: (discountValue: number) => void | null;
  setUserDiscountCode: (userInputCode: string) => void | null;
  imageIsLoaded: boolean;
  setImageIsLoaded: (value: boolean) => void;
  footerIsVisible: boolean;
  setFooterIsVisible: (value: boolean) => void;
  handleLoad?: () => void;
  notification: Notification | null;
  setNotification: (value: Notification | null) => void;
  csrfToken: string;
  fetchCsrfToken: () => void;
  loader: boolean;
  setLoader: (value: boolean) => void;
};

export type GlobalContextProviderProps = {
  children: ReactNode;
};

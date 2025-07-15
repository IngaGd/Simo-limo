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
  blurHash: string;
  packageUnitPrice: number;
  packageTotalPrice: number;
  deliveryPrice: number;
};

export type CartItemsType = Array<CartItemType>;

export type Notification = {
  type: "success" | "error";
  message: string;
  status?: number;
  subscription?: boolean;
};

export type GlobalContextType = {
  quantities: Array<QuantityType>;
  addToCart: (p: {
    id: number;
    title: string;
    imagePath: string;
    blurHash: string;
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
  isVisible: boolean;
  setIsVisible: (value: boolean) => void;
  addToCartModal: boolean;
  setAddToCartModal: (value: boolean) => void;
  emailModal: boolean;
  setEmailModal: (value: boolean) => void;
  handleIsVisible: () => void;
  notification: Notification | null;
  setNotification: (value: Notification | null) => void;
  csrfToken: string;
  setCsrfToken: (value: string) => void;
  loader: boolean;
  setLoader: (value: boolean) => void;
  imageIsLoaded: boolean;
  setImageIsLoaded: (value: boolean) => void;
};

export type GlobalContextProviderProps = {
  children: ReactNode;
};

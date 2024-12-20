export type ProductPropsTypes = {
  productList: {
    id: number;
    title: string;
    imagePath: string;
    description: string;
    price: number;
  };
  productQuantity?: number;
  addToCart?: () => void;
  handleIncrement?: () => void;
  handleDecrement?: () => void;
};

export type CartItemType = {
  id: number;
  title: string;
  quantity: number;
  totalPrice: number;
};

export type CartItemsType = Array<CartItemType>;

import { QuantityType } from "src/common/types/types";

export type ProductPropsTypes = {
  productList: {
    id: number;
    title: string;
    imagePath: string;
    description: string;
    price: number;
  };
  productQuantity?: number;
  quantities?: Array<QuantityType>;
  addToCart?: () => void;
  handleIncrement?: (id: number) => void;
  handleDecrement?: (id: number) => void;
};

import { QuantityType } from "src/common/context/globalContext.types";

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
  addToCart?: (p: {
    id: number;
    title: string;
    price: number;
    description: string;
    imagePath: string;
  }) => void;
  handleIncrement?: React.MouseEventHandler<HTMLDivElement> | undefined;
  handleDecrement?: React.MouseEventHandler<HTMLDivElement> | undefined;
};

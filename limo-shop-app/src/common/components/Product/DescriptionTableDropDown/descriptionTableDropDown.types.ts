import { ProductObject } from "../product.types";

export type DescriptionTableProps = {
  products: ProductObject[];
  // addToCart: () => void;
  // handleIncrement: () => void;
  // handleDecrement: () => void;
  handleIsActive: () => void;
};

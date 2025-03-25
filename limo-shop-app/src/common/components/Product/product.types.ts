export type ProductObject = {
  id: number;
  title: string;
  imagePath: string;
  description: string;
  packageQty: number;
  price: number;
  discountCode: string;
  discountValue: number;
};

export type ProductPropsTypes = {
  product: ProductObject;
};

export type ProductObject = {
  id: number;
  title: string;
  imagePath: string;
  description: string;
  packageQty: number;
  packageUnitPrice: number;
  price: number;
  deliveryPrice: number;
  discountCode: string;
  discountValue: number;
};

export type ProductPropsTypes = {
  product: ProductObject;
};

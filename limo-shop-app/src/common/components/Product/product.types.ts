export type ProductObject = {
  id: number;
  title: string;
  imagePath: string;
  description: string;
  price: number;
  packageQty: number;
  packageUnitPrice: number;
  packageTotalPrice: number;
  deliveryPrice: number;
  discountCode: string;
  discountValue: number;
};

export type ProductPropsTypes = {
  product: ProductObject;
};

export type ProductObject = {
  id: number;
  title: string;
  imagePath: string;
  description: string;
  price: number;
};

export type ProductPropsTypes = {
  product: ProductObject;
};

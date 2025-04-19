import { ProductObject } from "src/common/components/Product/product.types";

export const getUniqueByCategory = (products: ProductObject[]) => {
  return products.filter(
    (item, index, self) =>
      index === self.findIndex((i) => i.category === item.category)
  );
};

export const getGroupedProducts = (products: ProductObject[]) =>
  Object.groupBy(products, ({ category }) => category);

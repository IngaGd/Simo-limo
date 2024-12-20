export enum TitleType {
  ProductList = "title-product-list",
  Item = "title-item",
}

export enum TitleSize {
  Large = "size-l",
  Medium = "size-m",
  Small = "size-s",
}

export type TitleProps = {
  titleType: TitleType;
  title: String;
  titleSize: TitleSize;
};

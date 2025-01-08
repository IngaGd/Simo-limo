import { useState } from "react";
import { DescriptionTableDropDown } from "./DescriptionTableDropDown";
import styles from "./product.module.scss";
import { Title } from "components/Title";
import { TitleSize, TitleType } from "../Title/title.types";
import { Container } from "../Container";
import { Image } from "../Image";
import { ContainerType } from "../Container/container.types";
import { ProductPropsTypes } from "./product.types";

export function Product({ product }: ProductPropsTypes) {
  const [isActive, setIsActive] = useState(false);
  const handleClick = () => {
    setIsActive(!isActive);
  };

  console.log("Product component: ", product.imagePath);

  return (
    <div className={isActive ? styles.active : styles.product}>
      <Container
        containerType={ContainerType.ImageOfProductList}
        handleClick={handleClick}
      >
        <Image imagePath={product.imagePath} />
        <Title
          titleType={TitleType.ProductList}
          title={product.title}
          titleSize={TitleSize.Medium}
        />
      </Container>
      <DescriptionTableDropDown product={product} />
    </div>
  );
}

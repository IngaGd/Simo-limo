import { useState } from "react";
import { DescriptionTableDropDown } from "./DescriptionTableDropDown";
import styles from "./product.module.scss";
import { Title } from "components/Title";
import { TitleSize, TitleType } from "../Title/title.types";
import { Container } from "../Container";
import { Image } from "../Image";
import { ContainerType } from "../Container/container.types";
import { ProductPropsTypes } from "./product.types";
import { useIsActive } from "src/common/hooks/useIsActive";

export function Product({ product }: ProductPropsTypes) {
  const { handleIsActive, isActive } = useIsActive();

  return (
    <div className={isActive ? styles.active : styles.product}>
      <Container
        containerType={ContainerType.ImageOfProductList}
        handleClick={() => handleIsActive()}
      >
        <Image imagePath={product.imagePath} />
        <Title
          titleType={TitleType.ProductList}
          title={product.title}
          titleSize={TitleSize.Medium}
        />
      </Container>
      <DescriptionTableDropDown
        product={product}
        handleIsActive={handleIsActive}
      />
    </div>
  );
}

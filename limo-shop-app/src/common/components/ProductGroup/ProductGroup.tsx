import { useState } from "react";
// import { allAssets } from "src/assets";
import { DescriptionTableDropDown } from "./DescriptionTableDropDown";
import styles from "./productGroup.module.scss";
import { Title } from "components/Title";
import { TitleSize, TitleType } from "../Title/title.types";
import { Container } from "../Container";
import { Image } from "../Image";
import { ContainerType } from "../Container/container.types";
import { ProductGroupProps } from "./productGroup.types";

export function ProductGroup({
  title,
  imagePath,
  description,
}: ProductGroupProps) {
  const [isActive, setIsActive] = useState(false);
  return (
    <div
      className={isActive ? styles.product : styles.active}
      onClick={() => setIsActive((isActive) => !isActive)}
    >
      <Container containerType={ContainerType.ImageOfGroup}>
        <Image imagePath={imagePath} />
        <Title
          titleType={TitleType.Group}
          title={title}
          titleSize={TitleSize.Medium}
        />
      </Container>
      <DescriptionTableDropDown description={description} />
    </div>
  );
}

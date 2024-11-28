import { useState } from "react";
import { DescriptionTableDropDown } from "./DescriptionTableDropDown";
import styles from "./productGroupBox.module.scss";
import { Title } from "components/Title";
import { TitleSize, TitleType } from "components/Title/title.types";
import { Container } from "../Container";
import { ContainerType } from "../Container/container.types";
import { Image } from "../Image";
import { ImageAsset } from "../Image/image.types";

export function DealGroupBox() {
  const [isActive, setIsActive] = useState(false);
  return (
    <div
      className={styles.product}
      onClick={() => setIsActive((isActive) => !isActive)}
    >
      <Container containerType={ContainerType.ImageOfGroup}>
        <Image image={ImageAsset.Drop} />
      </Container>
      <Title
        title={"Mėnesio pasiūlymas"}
        titleSize={TitleSize.Medium}
        titleType={TitleType.Group}
      />
      <DescriptionTableDropDown isActive={isActive} />
    </div>
  );
}

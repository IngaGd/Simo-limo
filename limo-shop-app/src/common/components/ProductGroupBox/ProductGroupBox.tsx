import { useState } from "react";
// import { allAssets } from "src/assets";
import { DescriptionTableDropDown } from "./DescriptionTableDropDown";
import styles from "./productGroupBox.module.scss";
import { Title } from "components/Title";
import { TitleSize, TitleType } from "../Title/title.types";
import { Container } from "../Container";
import { Image } from "../Image";
import { ContainerType } from "../Container/container.types";
import { ImageAsset } from "../Image/image.types";
// import { ImageBox } from "src/common/components/Image";

export function ProductGroupBox() {
  const [isActive, setIsActive] = useState(false);
  return (
    <div
      className={styles.product}
      onClick={() => setIsActive((isActive) => !isActive)}
    >
      <Container containerType={ContainerType.ImageOfGroup}>
        <Image image={ImageAsset.Limo} />
      </Container>
      <Title
        titleType={TitleType.Group}
        title={"Dešimtinė juodo serbento"}
        titleSize={TitleSize.Medium}
      />
      <DescriptionTableDropDown isActive={isActive} />
    </div>
  );
}

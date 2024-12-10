import { useState } from "react";
// import { allAssets } from "src/assets";
import { DescriptionTableDropDown } from "./DescriptionTableDropDown";
import styles from "./productGroup.module.scss";
import { Title } from "components/Title";
import { TitleSize, TitleType } from "../Title/title.types";
import { Container } from "../Container";
import { Image } from "../Image";
import { ContainerType } from "../Container/container.types";
import { GroupTypes } from "./productGroup.types";

export function ProductGroup({ group }: GroupTypes) {
  const [isActive, setIsActive] = useState(false);
  return (
    <div
      className={isActive ? styles.active : styles.product}
      onClick={() => setIsActive((isActive) => !isActive)}
    >
      <Container containerType={ContainerType.ImageOfGroup}>
        <Image imagePath={group.imagePath} />
        <Title
          titleType={TitleType.Group}
          title={group.title}
          titleSize={TitleSize.Medium}
        />
      </Container>
      <DescriptionTableDropDown group={group} />
    </div>
  );
}

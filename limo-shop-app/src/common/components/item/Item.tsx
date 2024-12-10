import styles from "./item.module.scss";
import { Text } from "components/Text/Text";
import { Title } from "components/Title";
import { TitleSize, TitleType } from "src/common/components/Title/title.types";
import { Container } from "../Container";
import { ContainerType } from "../Container/container.types";
import { GroupTypes } from "../ProductGroup/productGroup.types";
import { Image } from "../Image";

export function Item({ group }: GroupTypes) {
  return (
    <div className={styles.item}>
      <div className={styles.image}>
        <Container containerType={ContainerType.ImageOfItem}>
          <Image imagePath={group.imagePath} />
          <Title
            title={group.title}
            titleSize={TitleSize.Medium}
            titleType={TitleType.Item}
          />
        </Container>
      </div>
      <div className={styles.description}>
        <Text text={group.description} />
      </div>
    </div>
  );
}

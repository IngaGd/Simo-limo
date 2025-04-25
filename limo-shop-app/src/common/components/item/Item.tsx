import styles from "./item.module.scss";
import { Text } from "components/Text/Text";
import { Title } from "components/Title";
import { TitleSize, TitleType } from "src/common/components/Title/title.types";
import { Container } from "../Container";
import { ContainerType } from "../Container/container.types";
import { ProductPropsTypes } from "../Product/product.types";
import { ImageComponent } from "../ImageComponent";

export function Item({ product }: ProductPropsTypes) {
  return (
    <div className={styles.item}>
      <div className={styles.image}>
        <Container containerType={ContainerType.ImageOfItem}>
          <ImageComponent
            imagePath={product.imagePath}
            blurHash={product.blurHash}
          />
        </Container>
        <Title
          title={product.title}
          titleSize={TitleSize.Medium}
          titleType={TitleType.Item}
        />
      </div>
      <div className={styles.description}>
        <Text text={product.description} />
      </div>
    </div>
  );
}

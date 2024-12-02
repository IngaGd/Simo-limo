import { Container } from "src/common/components/Container";
import { ContainerType } from "src/common/components/Container/container.types";
import { Image } from "src/common/components/Image";
import { ImageAsset } from "src/common/components/Image/image.types";
import styles from "./home.module.scss";

export function Home() {
  return (
    <div className={styles.home}>
      <div className={styles.box}>
        <Container containerType={ContainerType.ImageOfGroup}>
          <Image image={ImageAsset.Limo} />
        </Container>
      </div>

      <div className={styles.box}>
        <Container containerType={ContainerType.ImageOfGroup}>
          <Image image={ImageAsset.Limo} />
        </Container>
      </div>
    </div>
  );
}

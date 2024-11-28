import { Container } from "components/Container";
import styles from "./item.module.scss";
import { Image } from "components/Image";
import { Text } from "components/Text/Text";
import { Title } from "components/Title";
import { TitleSize, TitleType } from "src/common/components/Title/title.types";
import { ContainerType } from "../Container/container.types";
import { ImageAsset } from "../Image/image.types";

const itemText =
  "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sunt vitae consequuntur quo doloribus, consequatur ducimus delectus ea doloremque! Eos quo cum dolor nihil ab quaerat culpa. Dolorum nisi eveniet impedit.";

export function Item() {
  return (
    <div className={styles.item}>
      <div className={styles.image}>
        <Container containerType={ContainerType.ImageOfItem}>
          <Image image={ImageAsset.Limo} />
        </Container>
        <Title
          title={"Dešimtinė juodo serbento"}
          titleSize={TitleSize.Medium}
          titleType={TitleType.Item}
        />
      </div>
      <div className={styles.description}>
        <Text text={itemText} />
        <Text text={itemText} />
      </div>
    </div>
  );
}

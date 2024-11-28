import { Container } from "src/common/components/Container";
import styles from "./item.module.scss";
import { Image } from "src/common/components/Image";
import { Text } from "src/common/components/Text/Text";
import { Title } from "src/common/components/Title";
import { TitleSize, TitleType } from "src/common/components/Title/title.types";

const itemText =
  "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sunt vitae consequuntur quo doloribus, consequatur ducimus delectus ea doloremque! Eos quo cum dolor nihil ab quaerat culpa. Dolorum nisi eveniet impedit.";

export function Item() {
  return (
    <div className={styles.item}>
      <div className={styles.image}>
        <Container>
          <Image />
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

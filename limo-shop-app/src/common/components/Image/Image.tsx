import styles from "./image.module.scss";
import { ImageProps } from "./image.types";

export function Image({ imagePath }: ImageProps) {
  console.log("imagepath: ", imagePath);

  return <img src={imagePath} alt="" className={styles.image} />;
}

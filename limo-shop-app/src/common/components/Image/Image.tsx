import styles from "./image.module.scss";
import { allAssets } from "src/assets";
import { ImageProps } from "./image.types";

export function Image({ image }: ImageProps) {
  return <img src={allAssets[`${image}`]} alt="" className={styles.image} />;
}

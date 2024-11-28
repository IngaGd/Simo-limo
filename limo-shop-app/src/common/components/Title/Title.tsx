import styles from "./title.module.scss";
import { TitleProps } from "./title.types";

//const title = "Dešimtinė juodo serbento";

export function Title({ titleType, title, titleSize }: TitleProps) {
  const titleClass = `${styles[`${titleType}`]} ${styles[`${titleSize}`]}`;

  return <div className={`${titleClass} ${titleSize}`}>{title}</div>;
}

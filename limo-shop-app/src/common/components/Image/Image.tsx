import { useContext } from "react";
import styles from "./image.module.scss";
import { ImageProps } from "./image.types";
import { GlobalContext } from "src/common/context/GlobalContext";
import { GlobalContextType } from "src/common/context/globalContext.types";

export function Image({ imagePath }: ImageProps) {
  const { handleLoad } = useContext(GlobalContext) as GlobalContextType;

  return (
    <img src={imagePath} alt="" className={styles.image} onLoad={handleLoad} />
  );
}

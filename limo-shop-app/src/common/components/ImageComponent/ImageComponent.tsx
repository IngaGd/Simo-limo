import { useContext, useEffect } from "react";
import styles from "./imageComponent.module.scss";
import { ImageProps } from "./imageComponent.types";
// import { Blurhash } from "react-blurhash";
// import { useImageOnload } from "src/common/hooks/useImageOnload";
import { GlobalContext } from "src/common/context/GlobalContext";
import { GlobalContextType } from "src/common/context/globalContext.types";

export function ImageComponent({ imagePath }: ImageProps) {
  // const [imageIsLoaded, setImageIsLoaded] = useState(false);
  const { imageIsLoaded, setImageIsLoaded } = useContext(
    GlobalContext
  ) as GlobalContextType;

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setImageIsLoaded(true);
    };
    img.src = imagePath;
  }, [imagePath]);

  return (
    <>
      {/* <div className={styles.wraper}> */}
      <img
        src={imagePath}
        alt=""
        className={`${styles.image} ${imageIsLoaded ? styles.visible : ""}`}
        loading="lazy"
        // style={{ display: !imageIsLoaded ? "none" : "inline" }}
      />
      {/* <div className={`${styles.blur} ${imageIsLoaded ? styles.hidden : ""}`}>
          <Blurhash
            hash={blurHash}
            // width={380}
            // height={320}
            resolutionX={32}
            resolutionY={32}
            punch={1}
          />
        </div> */}
      {/* </div> */}
    </>
  );
}

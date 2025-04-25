import { useEffect, useState } from "react";
import styles from "./imageComponent.module.scss";
import { ImageProps } from "./imageComponent.types";
import { Blurhash } from "react-blurhash";

export function ImageComponent({ imagePath, blurHash }: ImageProps) {
  const [imageIsLoaded, setImageIsLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setImageIsLoaded(true);
    };
    img.src = imagePath;
  }, [imagePath]);

  return (
    <>
      <div style={{ display: imageIsLoaded ? "none" : "inline" }}>
        <Blurhash
          hash={blurHash}
          width={200}
          height={200}
          resolutionX={32}
          resolutionY={32}
          punch={1}
        />
      </div>
      <img
        src={imagePath}
        alt=""
        className={styles.image}
        loading="lazy"
        style={{ display: !imageIsLoaded ? "none" : "inline" }}
      />
    </>
  );
}

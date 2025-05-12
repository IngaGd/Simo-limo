import styles from "./loader.module.scss";
import { TailSpin } from "react-loader-spinner";

type LoaderProps = {
  size?: string;
  height?: number;
  top?: number;
};

export function Loader({ size, height, top }: LoaderProps) {
  return (
    <div
      className={`${styles.loader} ${
        size === "fullscreen" ? styles.fullscreen : ""
      }`}
      style={
        {
          "--top": `${top}px`,
          "--height": `${height}px`,
        } as React.CSSProperties
      }
    >
      {size === "fullscreen" ? (
        <div className={styles.fullscr}>
          <TailSpin height="80" width="80" color="white" ariaLabel="loading" />
        </div>
      ) : (
        <div>
          <TailSpin height="80" width="80" color="grey" ariaLabel="loading" />
        </div>
      )}
    </div>
  );
}

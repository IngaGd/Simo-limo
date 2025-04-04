import styles from "./loader.module.scss";
import { TailSpin } from "react-loader-spinner";

type LoaderProps = {
  size?: string;
};

export function Loader({ size }: LoaderProps) {
  return (
    <div
      className={`${styles.loader} ${
        size === "fullscreen" ? styles.fullscreen : ""
      }`}
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

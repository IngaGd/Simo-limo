import { IconSuccess, IconError } from "components/Icon";
import styles from "./notification.module.scss";

type Notification = {
  type: "success" | "error";
  size: "fullscreen" | "line";
  message: string;
  subscription?: boolean;
  height?: number;
  top?: number;
};

export function Notification({
  message,
  type,
  size,
  top,
  height,
}: Notification) {
  return (
    <div
      className={`${styles.notification} ${
        size === "fullscreen" ? styles.fullscreen : styles.line
      }`}
      style={
        {
          "--top": `${top}px`,
          "--height": `${height}px`,
        } as React.CSSProperties
      }
    >
      <div
        className={`${styles.modal} ${
          type === "success" ? styles.success : styles.error
        }`}
      >
        {type === "success" ? (
          <IconSuccess size="medium" />
        ) : (
          <IconError size="medium" />
        )}
        <div className={styles.message}> {message}</div>
      </div>
    </div>
  );
}

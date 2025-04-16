import { IconSuccess, IconError } from "components/Icon";
import styles from "./notification.module.scss";

type Notification = {
  type: "success" | "error";
  size: "fullscreen" | "line";
  message: string;
};

export function Notification({ message, type, size }: Notification) {
  return (
    <div
      className={`${styles.notification} ${
        size === "fullscreen" ? styles.fullscreen : styles.line
      }`}
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

import Alert from "@mui/material/Alert";
import styles from "./successNotification.module.scss";

type Notification = {
  message: string;
};

export function SuccessNotification({ message }: Notification) {
  return (
    <div className={styles.success}>
      <Alert severity="success" sx={{ fontSize: "14px" }}>
        {message}
      </Alert>
    </div>
  );
}

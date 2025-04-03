import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import styles from "./loader.module.scss";

export function Loader() {
  return (
    <div className={styles.loader}>
      <Stack sx={{ color: "grey.400" }}>
        <CircularProgress color="inherit" />
      </Stack>
    </div>
  );
}

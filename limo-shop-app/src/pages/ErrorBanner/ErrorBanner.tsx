import Alert from "@mui/material/Alert";

import { useContext } from "react";
import { GlobalContext } from "src/common/context/GlobalContext";
import { GlobalContextType } from "src/common/context/globalContext.types";
import styles from "./errorBanner.module.scss";

export function ErrorBanner() {
  const { error } = useContext(GlobalContext) as GlobalContextType;
  return (
    <div className={styles.errorBanner}>
      <Alert severity="error" sx={{ fontSize: "14px" }}>
        {error?.message}.
      </Alert>
    </div>
  );
}

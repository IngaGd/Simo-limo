import { Link } from "react-router-dom";
import styles from "./outOfStockCover.module.scss";

export function OutOfStockCover() {
  return (
    <div className={styles.container}>
      <h3>Šiuo metu neturiu</h3>
      <div>
        Norėtum atsigerti?
        <Link to="/contacts" className={styles.link}>
          Parašyk
        </Link>
      </div>
    </div>
  );
}

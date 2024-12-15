import styles from "./homePage.module.scss";
import { ProductGroup } from "src/common/components/ProductGroup";
import { group } from "../../assets/mok-data/group";

export function HomePage() {
  return (
    <div className={styles.home}>
      {group?.map((group) => (
        <div className={styles.box} key={group.id}>
          <ProductGroup group={group} />
        </div>
      ))}
    </div>
  );
}

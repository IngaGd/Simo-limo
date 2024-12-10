import styles from "./homePage.module.scss";
import { ProductGroup } from "src/common/components/ProductGroup";
import { group } from "../../assets/mok-data/group";

export function HomePage() {
  return (
    <div className={styles.home}>
      {group?.map((group) => (
        <div className={styles.box} key={group.id}>
          <ProductGroup
            // title={g.title}
            // imagePath={g.imagePath}
            // description={g.descripiton}
            group={group}
          />
        </div>
      ))}
    </div>
  );
}

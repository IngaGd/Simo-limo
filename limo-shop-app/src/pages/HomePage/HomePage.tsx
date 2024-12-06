import styles from "./homePage.module.scss";

import image1 from "src/assets/images/limo.jpg";
import image2 from "src/assets/images/drop.jpg";
import { ProductGroup } from "src/common/components/ProductGroup";

const group = [
  { id: 1, title: "Dešimtinė juodo serbento", imagePath: image1 },
  { id: 2, title: "Dešimtinė juodo serbento", imagePath: image2 },
];

export function HomePage() {
  return (
    <div className={styles.home}>
      {group?.map((g) => (
        <div className={styles.box} key={g.id}>
          <ProductGroup title={g.title} imagePath={g.imagePath} />
        </div>
      ))}
    </div>
  );
}

import styles from "./homePage.module.scss";

import image1 from "src/assets/images/limo.jpg";
import image2 from "src/assets/images/drop.jpg";
import { ProductGroup } from "src/common/components/ProductGroup";

const group = [
  {
    id: 1,
    title: "Dešimtinė juodo serbento",
    imagePath: image1,
    descripiton:
      "10 buteliukų pakuotė. Fermentuotas juodųjų serbentų ir mėtų limonadas. Visi ingredientai lietuviški ir natūralūs.",
  },
  {
    id: 2,
    title: "Mėnesio pasiūlymas",
    imagePath: image2,
    descripiton:
      "Exclusive limonadų asorti: šio mėnesio riboto leidimo kūriniai ir populiariausi gėrimai vienoje dešimties.",
  },
];

export function HomePage() {
  return (
    <div className={styles.home}>
      {group?.map((g) => (
        <div className={styles.box} key={g.id}>
          <ProductGroup
            title={g.title}
            imagePath={g.imagePath}
            description={g.descripiton}
          />
        </div>
      ))}
    </div>
  );
}

import { policyData } from "../../assets/data/polocy";
import styles from "./policy.module.scss";

export function Policy() {
  return (
    <div className={styles.terms}>
      <div className={styles.heading}>Privatumo politika</div>
      {policyData?.map((policy) => (
        <div key={policy.id}>
          <div className={styles.title}>{policy.title}</div>
          <div className={styles.paragraph}>
            {policy.paragraphs.map((paragraph) => (
              <div key={paragraph.id}>{paragraph.content}</div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

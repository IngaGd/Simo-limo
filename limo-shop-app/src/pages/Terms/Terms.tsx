import { termsData } from "../../assets/data/terms";
import styles from "./terms.module.scss";

export function Terms() {
  return (
    <div className={styles.terms}>
      <div className={styles.heading}>Pirkimo sąlygos</div>
      {termsData?.map((term) => (
        <div key={term.id} className={styles.paragraph}>
          <div className={styles.numeration}>
            <div>{term.id}.</div>
            <div>{term.term}</div>
          </div>
          <div>
            {term.conditions.map((condition) => (
              <div key={condition.id}>
                <div>
                  {condition.id}. {condition.condition}
                </div>
                <div>
                  {condition.details?.map((detail) => (
                    <div key={detail.id}>
                      <div>
                        {detail.index}. {detail.condition}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

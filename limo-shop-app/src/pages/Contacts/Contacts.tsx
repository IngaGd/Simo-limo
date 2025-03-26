import {
  IconInstagram,
  IconEmail,
  IconPhone,
} from "src/common/components/Icon";
import styles from "./contacts.module.scss";

export function Contacts() {
  return (
    <div className={styles.contacts}>
      <div className="heading-secondary">Kontaktai:</div>
      <div className={styles.links}>
        <a href="mailto:mbmaistas@gmail.com">
          <IconEmail size="medium" />
          mbmaistas@gmail.com
        </a>
        <a href="tel:+37069319891" className={styles.phone}>
          <IconPhone size="medium" />
          (+370) 693-19891
        </a>
        <a href="https://www.instagram.com/simo.delicatessen/" className="">
          <IconInstagram size="medium" />
          simo.delicatessen
        </a>
      </div>
      <div className={styles.address}>
        <address>
          Maistas, MB <br />
          Įmonės kodas: 305337184 <br />
          PVM kodas: LT100012777718 <br />
        </address>
      </div>
    </div>
  );
}

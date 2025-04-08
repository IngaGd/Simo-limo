import { IconInstagram, IconEmail } from "src/common/components/Icon";
import styles from "./contacts.module.scss";
import { Form } from "src/common/components/Form/Form";
import { useEffect } from "react";

export function Contacts() {
  useEffect(() => {
    const heightContacts = document.body.scrollHeight;
    console.log("Body scroll height:", heightContacts);
  }, []);

  return (
    <div className={styles.contacts}>
      <div className="heading-secondary">Kontaktai:</div>
      <div className={styles.links}>
        <a href="mailto:simolimonadai@gmail.com">
          <IconEmail size="medium" />
          simolimonadai@gmail.com
        </a>
        <a href="https://www.instagram.com/simo.delicatessen/" className="">
          <IconInstagram size="medium" />
          simo.delicatessen
        </a>
      </div>
      <Form />
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

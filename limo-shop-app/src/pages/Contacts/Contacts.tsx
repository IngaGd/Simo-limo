import {
  IconInstagram,
  IconEmail,
  IconCopy,
  IconCopied,
} from "src/common/components/Icon";
import styles from "./contacts.module.scss";
import { Form } from "src/common/components/Form/Form";
import { useCopyToClipboard } from "src/common/hooks/useCopyToClipboard";
import { contactData } from "../../assets/data/contacts";

export function Contacts() {
  const { handleCopy, contactCopied } = useCopyToClipboard();

  return (
    <div className={styles.contacts}>
      <div className="heading-secondary">Kontaktai:</div>
      <div>
        {contactData?.map((contact) => (
          <div key={contact.id} className={styles.links}>
            <div>
              {contact.icon === "email" ? (
                <a href="mailto:simolimonadai@gmail.com">
                  <IconEmail size="medium" />
                </a>
              ) : (
                <a
                  href="https://www.instagram.com/simo.delicatessen/"
                  target="_blank"
                >
                  <IconInstagram size="medium" />{" "}
                </a>
              )}
            </div>
            <div>{contact.contact}</div>

            <button onClick={() => handleCopy(contact)}>
              {" "}
              {contactCopied.find((el) => el.id === contact.id)?.isCopied ===
              true ? (
                <IconCopied size="medium" />
              ) : (
                <IconCopy size="medium" />
              )}
            </button>
          </div>
        ))}
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

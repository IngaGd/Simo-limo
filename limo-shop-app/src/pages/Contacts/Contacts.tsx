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
import { useElementPositionInView } from "src/common/hooks/useElementPositionInView";
import { useScrollY } from "src/common/hooks/useScrollY";
import { useContext } from "react";
import { GlobalContext } from "src/common/context/GlobalContext";
import { GlobalContextType } from "src/common/context/globalContext.types";
import { Loader } from "src/common/components/Loader/Loader";
import { Notification } from "src/common/components/Notification/Notification";

export function Contacts() {
  const { notification, loader } = useContext(
    GlobalContext
  ) as GlobalContextType;
  const { handleCopy, contactCopied } = useCopyToClipboard();
  const { ref, deviceHeight } = useElementPositionInView();
  const scrollY = useScrollY();

  return (
    <>
      {loader ? (
        <Loader size="fullscreen" top={scrollY} height={deviceHeight} />
      ) : notification ? (
        <Notification
          message={notification?.message}
          type={notification?.type}
          size="fullscreen"
          top={scrollY}
          height={deviceHeight}
        />
      ) : null}
      <div className={styles.contacts} ref={ref}>
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
        <div className={styles.form}>
          <Form />
        </div>
        <div className={styles.address}>
          <address>
            Maistas, MB <br />
            Įmonės kodas: 305337184 <br />
            PVM kodas: LT100012777718 <br />
          </address>
        </div>
      </div>
    </>
  );
}

import { useState } from "react";
import { contactData } from "../../assets/data/contacts";

type ContactCopiedType = {
  id: number;
  contact: string;
  icon: string;
  isCopied: boolean;
};

export function useCopyToClipboard() {
  const [contactCopied, setContactCopied] =
    useState<Array<ContactCopiedType>>(contactData);

  const handleCopy = async (value: {
    id: number;
    contact: string;
    icon: string;
    isCopied: boolean;
  }) => {
    try {
      await navigator.clipboard.writeText(value.contact);
      setContactCopied(
        contactCopied?.map((element) =>
          element.id === value.id
            ? { ...element, isCopied: true }
            : { ...element, isCopied: false }
        )
      );
      setTimeout(() => {
        setContactCopied(
          contactCopied.map((el) => ({ ...el, isCopied: false }))
        );
      }, 2000);
    } catch (err) {
      console.error(err);
    }
  };

  return { handleCopy, contactCopied };
}

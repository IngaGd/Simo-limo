import { useState } from "react";

export function useIsActive() {
  const [isActive, setIsActive] = useState(false);

  const handleIsActive = () => {
    setIsActive(!isActive);
  };

  return { handleIsActive, isActive };
}

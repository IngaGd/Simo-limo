import { useEffect, useState } from "react";

export function useScrollY() {
  const [scrollY, setScrollY] = useState(window.scrollY);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return scrollY;
}

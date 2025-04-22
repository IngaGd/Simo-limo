import { useEffect, useState, RefObject } from "react";

const useIntersectionObserver = (
  ref: RefObject<HTMLElement>,
  threshold: number
) => {
  const [isObserved, setIsObserved] = useState<boolean>(false);
  const [position, setPosition] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsObserved(true);
            setPosition(entry.boundingClientRect.top);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [ref, threshold]);

  return { isObserved, position, setPosition };
};

export default useIntersectionObserver;

import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

export function useElementPositionInView() {
  const { ref, inView, entry } = useInView({
    threshold: 0.2,
  });

  const [deviceHeight, setDeviceHeight] = useState(window.innerHeight);
  const [position, setPosition] = useState(0);

  useEffect(() => {
    const heigh = entry?.rootBounds?.height;
    if (heigh) {
      setDeviceHeight(heigh);
    }
    const position = entry?.boundingClientRect.top;
    if (position) {
      setPosition(position);
    }
    const handleResize = () => {
      setDeviceHeight(window.innerHeight);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [ref, inView, entry]);

  return { ref, inView, deviceHeight, position };
}

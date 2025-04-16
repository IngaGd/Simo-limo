import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

export function useElementPositionInView() {
  const { ref, inView, entry } = useInView({
    threshold: 1,
  });

  const [deviceHeight, setDeviceHeight] = useState(0);
  const [position, setPosition] = useState(0);

  useEffect(() => {
    const heigh = entry?.rootBounds?.height;
    if (heigh) {
      setDeviceHeight(heigh);
    }
    console.log("deviceHeight: ", deviceHeight);
    const position = entry?.boundingClientRect.top;
    if (position) {
      setPosition(position);
    }
  }, [ref, inView]);

  return { ref, inView, deviceHeight, position };
}

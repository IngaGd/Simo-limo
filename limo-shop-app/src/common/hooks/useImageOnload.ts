import { useState } from "react";

export function useImageOnload() {
  const [imageIsLoaded, setImageIsLoaded] = useState(false);
  return { imageIsLoaded, setImageIsLoaded };
}

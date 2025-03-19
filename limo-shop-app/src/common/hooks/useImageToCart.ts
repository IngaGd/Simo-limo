import { useState } from "react";

export function useImageToCart() {
  const [imageToCart, setImageToCart] = useState(false);

  const handleImageToCart = () => {
    setImageToCart(true);
  };

  const resetImageToCart = () => {
    setImageToCart(false);
  };

  return { imageToCart, handleImageToCart, resetImageToCart };
}

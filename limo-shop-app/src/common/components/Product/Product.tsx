//import { useContext } from "react";
import { DescriptionTableDropDown } from "./DescriptionTableDropDown";
import styles from "./product.module.scss";
import { Title } from "components/Title";
import { TitleSize, TitleType } from "../Title/title.types";
import { Container } from "../Container";
import { Image } from "../Image";
import { ContainerType } from "../Container/container.types";
import { ProductPropsTypes } from "./product.types";
import { useIsActive } from "src/common/hooks/useIsActive";
import { useContext } from "react";
import { GlobalContext } from "src/common/context/GlobalContext";
import { GlobalContextType } from "src/common/context/globalContext.types";
// import { GlobalContext } from "src/common/context/GlobalContext";
// import { GlobalContextType } from "src/common/context/globalContext.types";

export function Product({ product }: ProductPropsTypes) {
  const { handleIsActive, isActive } = useIsActive();
  const { imageIsLoaded, setImageIsLoaded } = useContext(
    GlobalContext
  ) as GlobalContextType;

  const handleLoad = () => {
    setImageIsLoaded(true);
  };

  return (
    <div className={isActive ? styles.active : styles.product}>
      <Container
        containerType={ContainerType.ImageOfProductList}
        handleClick={() => handleIsActive()}
      >
        <Image imagePath={product.imagePath} handleLoad={handleLoad} />
        <Title
          titleType={TitleType.ProductList}
          title={product.title}
          titleSize={TitleSize.Medium}
        />
      </Container>

      {imageIsLoaded && (
        <DescriptionTableDropDown
          product={product}
          handleIsActive={handleIsActive}
        />
      )}
    </div>
  );
}

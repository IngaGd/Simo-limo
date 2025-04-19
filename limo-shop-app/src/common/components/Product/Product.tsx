import { DescriptionTableDropDown } from "./DescriptionTableDropDown";
import styles from "./product.module.scss";
import { Title } from "components/Title";
import { TitleSize, TitleType } from "../Title/title.types";
import { Container } from "../Container";
import { Image } from "../Image";
import { ContainerType } from "../Container/container.types";
import { ProductPropsTypes } from "./product.types";
import { useIsActive } from "src/common/hooks/useIsActive";
import { useContext, useEffect } from "react";
import { GlobalContext } from "src/common/context/GlobalContext";
import { GlobalContextType } from "src/common/context/globalContext.types";
import { Notification } from "../Notification/Notification";

export function Product({ product, allProducts }: ProductPropsTypes) {
  const { handleIsActive, isActive } = useIsActive();
  const { setImageIsLoaded, notification } = useContext(
    GlobalContext
  ) as GlobalContextType;

  useEffect(() => {
    setImageIsLoaded(false);
  }, []);

  return (
    <div className={isActive ? styles.active : styles.product}>
      {notification?.type === "error" ? (
        <Notification
          message={notification?.message}
          type={notification?.type}
          size="line"
        />
      ) : (
        <div></div>
      )}
      <Container
        containerType={ContainerType.ImageOfProductList}
        handleClick={() => handleIsActive()}
      >
        <Image imagePath={product.imagePath} />
        <Title
          titleType={TitleType.ProductList}
          title={product.title}
          titleSize={TitleSize.Medium}
        />
      </Container>
      <DescriptionTableDropDown
        products={allProducts}
        handleIsActive={handleIsActive}
      />
    </div>
  );
}

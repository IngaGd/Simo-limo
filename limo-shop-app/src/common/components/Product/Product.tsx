import { DescriptionTableDropDown } from "./DescriptionTableDropDown";
import styles from "./product.module.scss";
import { Title } from "components/Title";
import { TitleSize, TitleType } from "../Title/title.types";
import { Container } from "../Container";
import { ImageComponent } from "../ImageComponent";
import { ContainerType } from "../Container/container.types";
import { ProductPropsTypes } from "./product.types";
import { useIsActive } from "src/common/hooks/useIsActive";
import { useContext } from "react";
import { GlobalContext } from "src/common/context/GlobalContext";
import { GlobalContextType } from "src/common/context/globalContext.types";
import { Notification } from "../Notification/Notification";
import { OutOfStockCover } from "../OutOfStockCover/OutOfStockCover";

export function Product({ product, allProducts }: ProductPropsTypes) {
  const { handleIsActive, isActive } = useIsActive();
  const { notification } = useContext(GlobalContext) as GlobalContextType;

  return (
    <div className={isActive ? styles.active : styles.product}>
      {notification?.type === "error" ? (
        <Notification
          message={notification?.message}
          type={notification?.type}
          size="line"
        />
      ) : null}

      <Container
        containerType={ContainerType.ImageOfProductList}
        handleClick={() => handleIsActive()}
      >
        <ImageComponent
          imagePath={product.imagePath}
          blurHash={product.blurHash}
        />
        <Title
          titleType={TitleType.ProductList}
          title={product.title}
          titleSize={TitleSize.Medium}
        />
        {product.stock === 0 ? <OutOfStockCover /> : null}
      </Container>
      <DescriptionTableDropDown
        products={allProducts}
        handleIsActive={handleIsActive}
      />
    </div>
  );
}

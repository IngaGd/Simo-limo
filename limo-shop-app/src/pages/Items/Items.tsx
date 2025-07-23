import { useParams } from "react-router-dom";
import { useContext, useEffect } from "react";
import { GlobalContext } from "src/common/context/GlobalContext";
import { GlobalContextType } from "src/common/context/globalContext.types";
import { useHandleProductList } from "src/common/hooks/useHandleProductList";
import { Loader } from "src/common/components/Loader/Loader";
import styles from "./item.module.scss";
import { Container } from "src/common/components/Container";
import { ImageComponent } from "src/common/components/ImageComponent";
import { ContainerType } from "src/common/components/Container/container.types";
import { Text } from "src/common/components/Text";
import { Title } from "src/common/components/Title";
import { TitleSize, TitleType } from "src/common/components/Title/title.types";
import { Button } from "src/common/components/Button";
import { Popup } from "src/common/components/Popup/Popup";
import { useElementPositionInView } from "src/common/hooks/useElementPositionInView";
import { useScrollY } from "src/common/hooks/useScrollY";
import { useTrackVisiting } from "src/common/hooks/useTrackVisiting";

const buttonText = "Pirkti";

export function Items() {
  const { loader } = useHandleProductList();
  const {
    products,
    addToCart,
    quantities,
    setQuantities,
    isVisible,
    setIsVisible,
    setImageIsLoaded,
    setAddToCartModal,
  } = useContext(GlobalContext) as GlobalContextType;
  const { category } = useParams();
  const { ref, deviceHeight } = useElementPositionInView();
  const scrollY = useScrollY();
  useTrackVisiting();

  const handleAddToCart = (p: {
    id: number;
    title: string;
    imagePath: string;
    blurHash: string;
    description: string;
    price: number;
    packageQty: number;
    packageUnitPrice: number;
    packageTotalPrice: number;
    deliveryPrice: number;
  }) => {
    addToCart(p);
    setQuantities(
      quantities.map((item) => {
        return {
          ...item,
          qty: 1,
        };
      })
    );
  };

  useEffect(() => {
    setImageIsLoaded(false);
  }, []);

  useEffect(() => {
    if (isVisible) {
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
    }
  }, [isVisible]);

  if (loader) return <Loader />;

  const item = products?.find((p) => p.category === category);
  const items = products?.filter((p) => p.category === category);

  if (!item) {
    return <div>Item not found</div>;
  }

  return (
    <>
      <div className={styles.item} ref={ref}>
        <div className={styles.image}>
          <Container containerType={ContainerType.ImageOfItem}>
            <ImageComponent
              imagePath={item.imagePath}
              blurHash={item.blurHash}
            />
          </Container>
          <Title
            title={item.title}
            titleSize={TitleSize.Medium}
            titleType={TitleType.Item}
          />
          {items?.map((item) => (
            <div className={styles.purchasingDetails} key={item.id}>
              <div className={styles.purchasing}>
                <div className={styles.priceDetails}>
                  <div className={styles.package}>{item.packageQty} but.</div>
                  <div className={styles.price}>{item.price} EUR</div>
                </div>
                <div className={styles.btn}>
                  {item.stock > 0 && (
                    <Button
                      colorMode="grey"
                      buttonLabel={buttonText}
                      handleClick={() => {
                        handleAddToCart(item);
                        setIsVisible(true);
                        setAddToCartModal(true);
                      }}
                    />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className={styles.description}>
          <Text text={item.description} />
        </div>
      </div>
      {isVisible && <Popup height={deviceHeight} top={scrollY} />}
    </>
  );
}

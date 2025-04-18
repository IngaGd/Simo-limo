import { Item } from "src/common/components/Item";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { GlobalContext } from "src/common/context/GlobalContext";
import { GlobalContextType } from "src/common/context/globalContext.types";
import { useHandleProductList } from "src/common/hooks/useHandleProductList";
import { Loader } from "src/common/components/Loader/Loader";
import styles from "./item.module.scss";
import { Container } from "src/common/components/Container";
import { Image } from "src/common/components/Image";
import { ContainerType } from "src/common/components/Container/container.types";
import { Text } from "src/common/components/Text";
import { Title } from "src/common/components/Title";
import { TitleSize, TitleType } from "src/common/components/Title/title.types";
import { Button } from "src/common/components/Button";

const buttonText = "Pirkti";

export function Items() {
  const { loader } = useHandleProductList();
  const { products, addToCart, quantities, setQuantities } = useContext(
    GlobalContext
  ) as GlobalContextType;
  const { category } = useParams();

  const handleAddToCart = (p: {
    id: number;
    title: string;
    imagePath: string;
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

  if (loader) return <Loader />;

  const item = products?.find((p) => p.category === category);
  const items = products?.filter((p) => p.category === category);

  if (!item) {
    return <div>Item not found</div>;
  }

  return (
    <div className={styles.item}>
      <div className={styles.image}>
        <Container containerType={ContainerType.ImageOfItem}>
          <Image imagePath={item?.imagePath} />
        </Container>
        {items?.map((item) => (
          <div className={styles.title} key={item.id}>
            <Title
              title={item.title}
              titleSize={TitleSize.Medium}
              titleType={TitleType.Item}
            >
              <div className={styles.purchasing}>
                <div className={styles.price}>{item.price} EUR</div>
                <div className={styles.btn}>
                  <Button
                    colorMode="grey"
                    buttonLabel={buttonText}
                    handleClick={() => {
                      handleAddToCart(item);
                    }}
                  />
                </div>
              </div>
            </Title>
          </div>
        ))}
      </div>
      <div className={styles.description}>
        <Text text={item.description} />
      </div>
    </div>
  );
}

import { Item } from "src/common/components/Item";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { GlobalContext } from "src/common/context/GlobalContext";
import { GlobalContextType } from "src/common/context/globalContext.types";

export function Items() {
  const { products } = useContext(GlobalContext) as GlobalContextType;
  const { category } = useParams();
  const item = products?.find((p) => p.category === category);

  if (!item) {
    return <div>Item not found</div>;
  }

  return <Item product={item} />;
}

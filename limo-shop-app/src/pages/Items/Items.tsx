import { Item } from "src/common/components/Item";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { GlobalContext } from "src/common/context/GlobalContext";
import { GlobalContextType } from "src/common/context/globalContext.types";

export function Items() {
  const { products } = useContext(GlobalContext) as GlobalContextType;

  const { id } = useParams();
  const itemId = Number(id);
  const item = products?.find((p) => p.id === itemId);

  if (!item) {
    return <div>Item not found</div>;
  }
  return <Item product={item} />;
}

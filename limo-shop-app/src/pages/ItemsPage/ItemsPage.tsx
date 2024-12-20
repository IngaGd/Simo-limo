import { Item } from "src/common/components/Item";
import { productList } from "../../assets/mok-data/productList";
import { useParams } from "react-router-dom";

export function ItemsPage() {
  const { id } = useParams();
  const itemId = Number(id);
  const item = productList.find((g) => g.id === itemId);

  if (!item) {
    return <div>Item not found</div>;
  }
  return <Item productList={item} />;
}

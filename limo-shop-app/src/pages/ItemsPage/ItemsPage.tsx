import { Item } from "src/common/components/Item";
import { group } from "../../assets/mok-data/group";
import { useParams } from "react-router-dom";

export function ItemsPage() {
  const { id } = useParams();
  const itemId = Number(id);
  const item = group.find((g) => g.id === itemId);

  if (!item) {
    return <div>Item not found</div>;
  }
  return <Item group={item} />;
}

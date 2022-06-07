import { Item, List } from "../Styles/list.style";

export function ListComponent({ listData = [] }) {
  const itemList = listData.map((element) => {
    return <Item key={element.id}>{element.name}</Item>;
  });

  return <List>{itemList}</List>;
}

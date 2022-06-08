import { useHistory } from "react-router-dom";
import { Item, List } from "../Styles/list.style";

export function ListComponent({ listData = [] }) {
  const history = useHistory();
  const url = history.location.pathname;
  const itemList = listData.map((element) => {
    return (
      <Item
        onClick={() => {
          history.push(`/home/${element.key}`);
        }}
        key={element.id}
        active={url === `/home/${element.key}`}
      >
        {element.name}
      </Item>
    );
  });

  return <List>{itemList}</List>;
}

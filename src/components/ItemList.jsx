import Item from './Item';

function ItemList({ itemList, selectedItem, onItemClick, onDeleteItem }) {
  return (
    <ul className="item-list">
      {itemList.map((item) => (
          <Item
          key={item.id}
          id={item.id}
          name={item.name}
          comments={item.comments}
          isSelected={selectedItem.id === item.id}
          onItemClick={() => onItemClick(item)}
          onDeleteItem={onDeleteItem}
        />
      ))}
    </ul>
  );
}

export default ItemList;
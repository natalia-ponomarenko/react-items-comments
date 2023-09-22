function Item({ id, name, comments, isSelected, onItemClick, onDeleteItem }) {
  return (
    <li
      key={id}
      onClick={() => onItemClick(id)}
      className={isSelected ? "selected" : ""}
    >
      {name} {comments.length}
      <button onClick={() => onDeleteItem(id)}>Delete</button>
    </li>
  );
}

export default Item;

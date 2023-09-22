import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [item, setItem] = useState("");
  const [itemList, setItemList] = useState(
    JSON.parse(localStorage.getItem("itemList")) || []
  );
  const [selectedItem, setSelectedItem] = useState(
    JSON.parse(localStorage.getItem("selectedItem")) || {}
  );
  const [comment, setComment] = useState("");
  const [commentColor, setCommentColor] = useState("#000000");

  useEffect(() => {
    const storedItemList = localStorage.getItem("itemList");
    if (storedItemList) {
      setItemList(JSON.parse(storedItemList));
    }

    const storedSelectedItem = localStorage.getItem("selectedItem");
    if (storedSelectedItem) {
      setSelectedItem(JSON.parse(storedSelectedItem));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("itemList", JSON.stringify(itemList));
  }, [itemList]);

  useEffect(() => {
    localStorage.setItem("selectedItem", JSON.stringify(selectedItem));
  }, [selectedItem]);

  useEffect(() => {
    if (itemList.length === 0) {
      setSelectedItem({});
    } else if (!itemList.find((item) => item.id === selectedItem.id)) {
      setSelectedItem(itemList[itemList.length - 1]);
    }
  }, [itemList, selectedItem.id]);

  const handleItemChange = (e) => {
    setItem(e.target.value);
  };

  const handleAddItem = () => {
    const randomIndex = Math.floor(Math.random() * 100000000);

    if (item.trim() !== "") {
      const newItem = {
        id: randomIndex,
        name: item,
        comments: [],
      };

      setItemList([...itemList, newItem]);
      setItem("");
    }
  };

  const handleDeleteItem = (id) => {
    const updatedList = itemList.filter((item) => item.id !== id);
    setItemList(updatedList);
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setComment("");
    setCommentColor("#000000");
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleColorChange = (e) => {
    setCommentColor(e.target.value);
  };

  const handleAddComment = () => {
    const randomIndex = Math.floor(Math.random() * 100000000);

    if (comment.trim() !== "") {
      const updatedList = [...itemList];
      const selectedItemIndex = updatedList.findIndex(
        (item) => item.id === selectedItem.id
      );

      if (selectedItemIndex !== -1) {
        const newComment = {
          id: randomIndex,
          text: comment,
          color: commentColor,
        };

        updatedList[selectedItemIndex].comments.push(newComment);
        setItemList(updatedList);
        setComment("");
        setCommentColor("#000000");
      }
    }
  };

  return (
    <div className="react-app">
      <div>
        <div className="react-items">
          <h1>Items</h1>
          <form className="react-items-input-group">
            <input
              type="text"
              placeholder="Enter an item"
              value={item}
              onChange={handleItemChange}
              className="form-control"
              required
            />
            <button
              className="btn btn-info"
              onClick={handleAddItem}
            >
              Add New
            </button>
          </form>
          {itemList.length > 0 && (
            <ul className="list-group">
              {itemList.map((item) => (
                <li
                  key={item.id}
                  onClick={() => handleItemClick(item)}
                  className={`list-group-item ${
                    selectedItem.id === item.id ? "active-item" : ""
                  }`}
                >
                  {item.name}
                  <span className="badge badge-info badge-pill">
                    {item.comments.length}
                  </span>
                  <button
                    className="btn btn-outline-danger"
                    onClick={() => handleDeleteItem(item.id)}
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {(!!selectedItem.id || itemList.length === 0) && (
        <div>
          <div className="react-comments">
            <h1>Comments #{selectedItem.id || ""}</h1>
            {selectedItem?.comments?.map((comment) => (
              <div
                className="react-comment"
                key={comment.id}
              >
                <div className="card">
                  <div
                    className="card-color"
                    style={{
                      width: "50px",
                      height: "50px",
                      backgroundColor: comment.color,
                    }}
                  ></div>
                  <div className="card-body">
                    <pre className="card-text">{comment.text}</pre>
                  </div>
                </div>
              </div>
            ))}
            <form className="comment-input-container">
              <input
                type="color"
                className="form-control"
                value={commentColor}
                onChange={handleColorChange}
              />
              <textarea
                placeholder="Type comment here..."
                value={comment}
                onChange={handleCommentChange}
                className="form-control"
                required
              />
              <button
                className="btn btn-primary"
                onClick={handleAddComment}
                type="submit"
              >
                Add New
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

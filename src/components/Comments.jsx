function Comments({ selectedItem, comment, commentColor, onCommentChange, onColorChange, onAddComment, comments }) {
  return (
    <div className="comments-container">
      <h2>Comments</h2>
      <div className="comment-input-container">
        <p>#ID: {selectedItem || ""}</p>
        <textarea
          placeholder="Type a comment here..."
          value={comment}
          onChange={onCommentChange}
          required
        />
        <input
          type="color"
          value={commentColor}
          onChange={onColorChange}
        />
        <button onClick={onAddComment}>Add Comment</button>
      </div>
      <ul className="comment-list">
        {comments.map((comment) => (
          <li key={comment.id}>
            <div
              className="comment-color"
              style={{
                backgroundColor: comment.color,
                width: "20px",
                height: "20px",
              }}
            ></div>
            {comment.text}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Comments;
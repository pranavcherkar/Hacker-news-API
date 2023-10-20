import React from "react";
const Comments = ({ comment }) => (
  <li>
    <strong>{comment.author}:</strong> {comment.text}
    {comment.children && (
      <ul>
        {comment.children.map((childComment) => (
          <Comments key={childComment.id} comment={childComment} />
        ))}
      </ul>
    )}
  </li>
);
export default Comments;

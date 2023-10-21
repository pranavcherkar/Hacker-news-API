import React, { useState } from "react";
const Comments = ({ comment, isTopLevel }) => {
  const [showFullText, setShowFullText] = useState(false);
  const textToShow = showFullText ? comment.text : comment.text.slice(0, 50);

  const toggleReadMore = () => {
    setShowFullText(!showFullText);
  };
  return (
    <>
      <div className="comment">
        <li className={isTopLevel ? "top-level-comment" : "child-comment"}>
          <strong>-{comment.author}:</strong> {textToShow}
          {comment.text.length > 50 && (
            <p
              style={{
                color: "blue",
                borderColor: "black",
              }}
              onClick={toggleReadMore}
            >
              {showFullText ? "Read less" : "Read more"}
            </p>
          )}
          {comment.children && (
            <ul>
              {comment.children.map((childComment) => (
                <Comments
                  key={childComment.id}
                  comment={childComment}
                  isTopLevel={false}
                />
              ))}
            </ul>
          )}
        </li>
      </div>
    </>
  );
};
export default Comments;

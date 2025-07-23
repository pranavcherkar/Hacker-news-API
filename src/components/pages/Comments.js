import React, { useState } from "react";

const Comments = ({ comment, isTopLevel }) => {
  const [showFullText, setShowFullText] = useState(false);

  if (!comment?.text) return null;

  const textToShow = showFullText
    ? comment.text
    : comment.text.slice(0, 100); // Show more preview

  const toggleReadMore = () => {
    setShowFullText((prev) => !prev);
  };

  return (
    <li
      className={`border rounded-lg p-4 mb-3 ${
        isTopLevel ? "bg-white shadow-md" : "bg-gray-50 ml-6"
      }`}
    >
      <p className="mb-2">
        <span className="font-semibold text-blue-700">- {comment.author}</span>
        <span className="ml-2 text-gray-800">{textToShow}</span>
      </p>

      {comment.text.length > 100 && (
        <button
          onClick={toggleReadMore}
          className="text-sm text-blue-600 hover:underline"
        >
          {showFullText ? "Read less" : "Read more"}
        </button>
      )}

      {comment.children && comment.children.length > 0 && (
        <ul className="mt-3">
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
  );
};

export default Comments;

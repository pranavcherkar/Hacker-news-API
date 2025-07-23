import React, { useState } from "react";

const Comments = ({ comment, isTopLevel }) => {
  const [showFullText, setShowFullText] = useState(false);

  if (!comment?.text) return null;

  const textToShow = showFullText
    ? comment.text
    : comment.text.slice(0, 100);

  const toggleReadMore = () => setShowFullText((prev) => !prev);

  return (
    <li
      className={`relative my-4 p-4 rounded-xl transition-all duration-300 ${
        isTopLevel
          ? "bg-gradient-to-r from-yellow-50 to-orange-100 shadow-md"
          : "bg-gradient-to-r from-purple-50 to-indigo-100 ml-6"
      }`}
    >
      {/* Author */}
      <p className="mb-2 text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-500">
        @{comment.author}
      </p>

      {/* Comment Text */}
      <p className="text-gray-800 whitespace-pre-line leading-relaxed">
        {textToShow}
        {comment.text.length > 100 && (
          <button
            onClick={toggleReadMore}
            className="ml-2 text-blue-600 hover:underline text-sm"
          >
            {showFullText ? "Read less" : "...Read more"}
          </button>
        )}
      </p>

      {/* Nested Comments */}
      {comment.children && comment.children.length > 0 && (
        <ul className="mt-4 border-l-2 border-indigo-300 pl-4">
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

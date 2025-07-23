import React, { useState } from "react";

const Comments = ({ comment, isTopLevel, depth = 0 }) => {
  const [showFullText, setShowFullText] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  if (!comment?.text) return null;
  
  const textToShow = showFullText
    ? comment.text
    : comment.text.slice(0, 150);
  
  const toggleReadMore = () => setShowFullText((prev) => !prev);
  const toggleCollapse = () => setIsCollapsed((prev) => !prev);
  
  // Dynamic styling based on depth and level
  const getCommentStyles = () => {
    const baseStyles = "relative my-3 rounded-lg transition-all duration-300 hover:shadow-lg border";
    
    if (isTopLevel) {
      return `${baseStyles} bg-gradient-to-br from-white via-orange-50 to-amber-50 border-orange-200 shadow-md p-5`;
    } else {
      const indentLevel = Math.min(depth, 5);
      const colors = [
        "from-blue-50 to-indigo-50 border-blue-200",
        "from-green-50 to-emerald-50 border-green-200", 
        "from-purple-50 to-violet-50 border-purple-200",
        "from-pink-50 to-rose-50 border-pink-200",
        "from-yellow-50 to-amber-50 border-yellow-200"
      ];
      
      const marginLeft = Math.min(indentLevel * 16, 32); // Using pixels instead of Tailwind classes
      return `${baseStyles} bg-gradient-to-br ${colors[indentLevel % colors.length]} p-4` + 
             ` style="margin-left: ${marginLeft}px"`;
    }
  };
  
  const getAuthorStyles = () => {
    if (isTopLevel) {
      return "text-orange-600 font-bold text-base";
    }
    return "text-indigo-600 font-semibold text-sm";
  };

  // Icons as SVG components to avoid external dependencies
  const UserIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </svg>
  );

  const MessageIcon = () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    </svg>
  );

  const ChevronDown = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="6,9 12,15 18,9"/>
    </svg>
  );

  const ChevronUp = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="18,15 12,9 6,15"/>
    </svg>
  );

  const marginLeftStyle = !isTopLevel && depth > 0 ? 
    { marginLeft: `${Math.min(depth * 16, 32)}px` } : {};

  return (
    <li 
      className={`relative my-3 rounded-lg transition-all duration-300 hover:shadow-lg border ${
        isTopLevel
          ? "bg-gradient-to-br from-white via-orange-50 to-amber-50 border-orange-200 shadow-md p-5"
          : `bg-gradient-to-br ${
              [
                "from-blue-50 to-indigo-50 border-blue-200",
                "from-green-50 to-emerald-50 border-green-200", 
                "from-purple-50 to-violet-50 border-purple-200",
                "from-pink-50 to-rose-50 border-pink-200",
                "from-yellow-50 to-amber-50 border-yellow-200"
              ][(depth || 0) % 5]
            } p-4`
      }`}
      style={marginLeftStyle}
    >
      {/* Comment Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <div className={`p-1.5 rounded-full ${isTopLevel ? 'bg-orange-100' : 'bg-indigo-100'}`}>
            <div className={isTopLevel ? 'text-orange-600' : 'text-indigo-600'}>
              <UserIcon />
            </div>
          </div>
          <span className={getAuthorStyles()}>
            {comment.author}
          </span>
          {comment.time && (
            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
              {new Date(comment.time * 1000).toLocaleDateString()}
            </span>
          )}
        </div>
        
        {/* Collapse button for comments with children */}
        {comment.children && comment.children.length > 0 && (
          <button
            onClick={toggleCollapse}
            className="flex items-center space-x-1 text-gray-500 hover:text-gray-700 transition-colors p-1 rounded-md hover:bg-gray-100"
          >
            {isCollapsed ? <ChevronDown /> : <ChevronUp />}
            <span className="text-xs">{comment.children.length}</span>
          </button>
        )}
      </div>

      {/* Comment Content */}
      {!isCollapsed && (
        <>
          <div className="relative">
            <p className="text-gray-800 leading-relaxed whitespace-pre-line text-sm">
              {textToShow}
              {comment.text.length > 150 && (
                <button
                  onClick={toggleReadMore}
                  className="ml-2 inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors text-sm font-medium hover:underline"
                >
                  {showFullText ? "Show less" : "...Show more"}
                </button>
              )}
            </p>
          </div>

          {/* Reply indicator */}
          {comment.children && comment.children.length > 0 && (
            <div className="flex items-center mt-3 text-xs text-gray-500">
              <div className="mr-1">
                <MessageIcon />
              </div>
              <span>{comment.children.length} {comment.children.length === 1 ? 'reply' : 'replies'}</span>
            </div>
          )}

          {/* Nested Comments */}
          {comment.children && comment.children.length > 0 && (
            <div className="mt-4 relative">
              {/* Connection line */}
              <div className={`absolute left-0 top-0 bottom-0 w-0.5 ${
                isTopLevel ? 'bg-orange-200' : 'bg-indigo-200'
              }`}></div>
              
              <ul className="pl-4 space-y-2">
                {comment.children.map((childComment) => (
                  <Comments
                    key={childComment.id}
                    comment={childComment}
                    isTopLevel={false}
                    depth={(depth || 0) + 1}
                  />
                ))}
              </ul>
            </div>
          )}
        </>
      )}
    </li>
  );
};

export default Comments;

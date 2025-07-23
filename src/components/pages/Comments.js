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

  // Icons as SVG components
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

  // Dynamic styles
  const getCommentStyle = () => {
    const baseStyle = {
      position: 'relative',
      margin: '12px 0',
      borderRadius: '8px',
      transition: 'all 0.3s ease',
      border: '1px solid',
      listStyle: 'none',
      cursor: 'default'
    };

    if (isTopLevel) {
      return {
        ...baseStyle,
        background: 'linear-gradient(135deg, #ffffff 0%, #fff7ed 50%, #fef3c7 100%)',
        borderColor: '#fed7aa',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        padding: '20px'
      };
    } else {
      const colors = [
        { bg: 'linear-gradient(135deg, #eff6ff 0%, #e0e7ff 100%)', border: '#c7d2fe' },
        { bg: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)', border: '#bbf7d0' },
        { bg: 'linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%)', border: '#d8b4fe' },
        { bg: 'linear-gradient(135deg, #fdf2f8 0%, #fce7f3 100%)', border: '#f9a8d4' },
        { bg: 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)', border: '#fde68a' }
      ];
      
      const colorSet = colors[Math.min(depth, 4)];
      
      return {
        ...baseStyle,
        background: colorSet.bg,
        borderColor: colorSet.border,
        padding: '16px',
        marginLeft: `${Math.min(depth * 16, 32)}px`
      };
    }
  };

  const getHoverStyle = (isHovered) => ({
    boxShadow: isHovered ? '0 10px 25px rgba(0, 0, 0, 0.1)' : getCommentStyle().boxShadow
  });

  const headerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '12px'
  };

  const authorSectionStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  };

  const avatarStyle = {
    padding: '6px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: isTopLevel ? '#fed7aa' : '#e0e7ff',
    color: isTopLevel ? '#ea580c' : '#4f46e5'
  };

  const authorStyle = {
    fontWeight: isTopLevel ? '700' : '600',
    color: isTopLevel ? '#ea580c' : '#4f46e5',
    fontSize: isTopLevel ? '16px' : '14px',
    margin: 0
  };

  const timeStyle = {
    fontSize: '12px',
    color: '#6b7280',
    backgroundColor: '#f3f4f6',
    padding: '4px 8px',
    borderRadius: '12px'
  };

  const collapseButtonStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    color: '#6b7280',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '4px',
    borderRadius: '4px',
    transition: 'all 0.2s ease'
  };

  const contentStyle = {
    position: 'relative'
  };

  const textStyle = {
    color: '#1f2937',
    lineHeight: '1.6',
    whiteSpace: 'pre-line',
    fontSize: '14px',
    margin: 0
  };

  const readMoreButtonStyle = {
    marginLeft: '8px',
    color: '#2563eb',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'all 0.2s ease'
  };

  const replyIndicatorStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    marginTop: '12px',
    fontSize: '12px',
    color: '#6b7280'
  };

  const nestedCommentsStyle = {
    marginTop: '16px',
    position: 'relative'
  };

  const connectionLineStyle = {
    position: 'absolute',
    left: '0',
    top: '0',
    bottom: '0',
    width: '2px',
    backgroundColor: isTopLevel ? '#fed7aa' : '#c7d2fe'
  };

  const commentListStyle = {
    paddingLeft: '16px',
    margin: 0,
    listStyle: 'none'
  };

  const [isHovered, setIsHovered] = useState(false);
  const [buttonHovered, setButtonHovered] = useState(false);
  const [readMoreHovered, setReadMoreHovered] = useState(false);

  return (
    <li 
      style={{
        ...getCommentStyle(),
        ...getHoverStyle(isHovered)
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Comment Header */}
      <div style={headerStyle}>
        <div style={authorSectionStyle}>
          <div style={avatarStyle}>
            <UserIcon />
          </div>
          <span style={authorStyle}>
            {comment.author}
          </span>
          {comment.time && (
            <span style={timeStyle}>
              {new Date(comment.time * 1000).toLocaleDateString()}
            </span>
          )}
        </div>
        
        {/* Collapse button */}
        {comment.children && comment.children.length > 0 && (
          <button
            onClick={toggleCollapse}
            style={{
              ...collapseButtonStyle,
              backgroundColor: buttonHovered ? '#f3f4f6' : 'transparent',
              color: buttonHovered ? '#374151' : '#6b7280'
            }}
            onMouseEnter={() => setButtonHovered(true)}
            onMouseLeave={() => setButtonHovered(false)}
          >
            {isCollapsed ? <ChevronDown /> : <ChevronUp />}
            <span style={{ fontSize: '12px' }}>{comment.children.length}</span>
          </button>
        )}
      </div>

      {/* Comment Content */}
      {!isCollapsed && (
        <>
          <div style={contentStyle}>
            <p style={textStyle}>
              {textToShow}
              {comment.text.length > 150 && (
                <button
                  onClick={toggleReadMore}
                  style={{
                    ...readMoreButtonStyle,
                    color: readMoreHovered ? '#1d4ed8' : '#2563eb',
                    textDecoration: readMoreHovered ? 'underline' : 'none'
                  }}
                  onMouseEnter={() => setReadMoreHovered(true)}
                  onMouseLeave={() => setReadMoreHovered(false)}
                >
                  {showFullText ? "Show less" : "...Show more"}
                </button>
              )}
            </p>
          </div>

          {/* Reply indicator */}
          {comment.children && comment.children.length > 0 && (
            <div style={replyIndicatorStyle}>
              <MessageIcon />
              <span>{comment.children.length} {comment.children.length === 1 ? 'reply' : 'replies'}</span>
            </div>
          )}

          {/* Nested Comments */}
          {comment.children && comment.children.length > 0 && (
            <div style={nestedCommentsStyle}>
              <div style={connectionLineStyle}></div>
              
              <ul style={commentListStyle}>
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

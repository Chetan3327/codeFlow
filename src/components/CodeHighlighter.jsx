import React from 'react';

const CodeHighlighter = ({ text }) => {
  // Regular expression to match text between triple backticks
  const codeRegex = /```([\s\S]*?)```/g;

  // Split the text based on triple backticks
  const parts = text.split(codeRegex);

  // Process the parts to wrap the code in spans with a background color
  const highlightedText = parts.map((part, index) => {
    if (index % 2 === 1) {
      // This is the code between triple backticks
      return (
        <span key={index} style={{ backgroundColor: '#000', color: '#fff', padding: '2px' }}>
          {part}
        </span>
      );
    } else {
      // This is the regular text
      return <span key={index}>{part}</span>;
    }
  });

  return <div>{highlightedText}</div>;
};

export default CodeHighlighter;

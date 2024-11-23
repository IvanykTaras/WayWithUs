import React from 'react';

interface ShortenTextProps {
  text: string;
  maxLength: number;
}

const ShortenText: React.FC<ShortenTextProps> = ({ text, maxLength }) => {
  // Function to truncate the text
  const truncateText = (text: string, maxLength: number): string => {
    return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
  };

  return (
    <p>
      {truncateText(text, maxLength)}
    </p>
  );
};
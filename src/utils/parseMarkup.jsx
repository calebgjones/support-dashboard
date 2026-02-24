import React from 'react';

/**
 * Parses text with markup tags and converts to React elements with styling
 * Supported tags:
 * ~i text ~i - italic
 * ~b text ~b - bold
 * ~u text ~u - underline
 * ~n - line break
 * 
 * Tags can be nested/stacked: "~u~bhello world~b~u this is Caleb"
 * Results in: bold+underlined "hello world" followed by unstyled "this is Caleb"
 * 
 * @param {string} text - The text to parse
 * @returns {React.ReactNode} - Parsed React elements
 */
export const parseMarkup = (text) => {
  if (!text || typeof text !== 'string') {
    return text;
  }

  let uniqueKey = 0;

  // Process markup tags sequentially, handling nesting
  const processMarkup = (inputText, isNested = false) => {
    if (typeof inputText !== 'string') return inputText;

    // Check for line break tag first
    const lineBreakIndex = inputText.indexOf('~n');
    
    // Find the first opening tag for formatting
    const tagRegex = /~([ibu])/;
    const match = tagRegex.exec(inputText);

    // If we have a line break and it comes before any formatting tag (or there's no formatting tag)
    if (lineBreakIndex !== -1 && (!match || lineBreakIndex < match.index)) {
      const segments = [];
      
      // Add text before the line break
      if (lineBreakIndex > 0) {
        segments.push(inputText.substring(0, lineBreakIndex));
      }
      
      // Add the line break
      segments.push(<br key={`br-${uniqueKey++}`} />);
      
      // Process remaining text
      const remainingText = inputText.substring(lineBreakIndex + 2);
      if (remainingText.length > 0) {
        const processedRemaining = processMarkup(remainingText, false);
        if (Array.isArray(processedRemaining)) {
          segments.push(...processedRemaining);
        } else {
          segments.push(processedRemaining);
        }
      }
      
      return segments;
    }

    if (!match) {
      // No markup tags found, return as-is
      return inputText;
    }

    const openingIndex = match.index;
    const tag = match[1];
    
    // Find the matching closing tag for this specific tag type
    const closingPattern = `~${tag}`;
    const closingIndex = inputText.indexOf(closingPattern, openingIndex + 2);

    if (closingIndex === -1) {
      // No matching closing tag, treat as plain text
      return inputText;
    }

    const segments = [];

    // Add text before the opening tag
    if (openingIndex > 0) {
      segments.push(inputText.substring(0, openingIndex));
    }

    // Extract content between the tags
    const contentStart = openingIndex + 2; // Skip ~X
    const contentEnd = closingIndex;
    const content = inputText.substring(contentStart, contentEnd);

    // Recursively process the content for nested tags
    const processedContent = processMarkup(content, true);

    // Check if the next character after closing tag is punctuation
    const nextChar = inputText[closingIndex + 2];
    const isPunctuationNext = nextChar && /[.,;:!?)}\]]/.test(nextChar);

    // Create the styled element - only add nbsp if not nested
    switch (tag) {
      case 'i':
        segments.push(
          <React.Fragment key={`i-${uniqueKey++}`}>
            {!isNested && '\u00A0'}
            <i className="italic">{processedContent}</i>
            {!isNested && !isPunctuationNext && '\u00A0'}
          </React.Fragment>
        );
        break;
      case 'b':
        segments.push(
          <React.Fragment key={`b-${uniqueKey++}`}>
            {!isNested && '\u00A0'}
            <strong className="font-bold">{processedContent}</strong>
            {!isNested && !isPunctuationNext && '\u00A0'}
          </React.Fragment>
        );
        break;
      case 'u':
        segments.push(
          <React.Fragment key={`u-${uniqueKey++}`}>
            {!isNested && '\u00A0'}
            <u className="underline">{processedContent}</u>
            {!isNested && !isPunctuationNext && '\u00A0'}
          </React.Fragment>
        );
        break;
    }

    // Process the rest of the text after the closing tag
    const remainingText = inputText.substring(closingIndex + 2);
    if (remainingText.length > 0) {
      const processedRemaining = processMarkup(remainingText, false);
      if (Array.isArray(processedRemaining)) {
        segments.push(...processedRemaining);
      } else {
        segments.push(processedRemaining);
      }
    }

    return segments;
  };

  const result = processMarkup(text, false);
  
  // Return as a fragment if it's an array, otherwise return as-is
  return Array.isArray(result) && result.length > 0 ? <>{result}</> : result;
};

/**
 * Component wrapper for parseMarkup
 * @param {Object} props
 * @param {string} props.text - The text to parse and display
 * @param {string} props.className - Optional className to apply to wrapper
 */
export const FormattedText = ({ text, className = '' }) => {
  return <span className={className}>{parseMarkup(text)}</span>;
};

export default parseMarkup;

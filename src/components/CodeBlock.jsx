import React, { useState, useEffect } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus, vs } from 'react-syntax-highlighter/dist/esm/styles/prism';

/**
 * A custom code block component for react-markdown that supports syntax highlighting
 * with automatic theme switching between light and dark modes.
 */
const CodeBlock = {
  code({ node, inline, className, children, ...props }) {

    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
      const checkDarkMode = () => {
        setIsDarkMode(document.documentElement.classList.contains('dark'));
      };

      checkDarkMode();

      // Use a MutationObserver to watch for class changes on the root element.
      // This allows the syntax highlighting to update instantly when the theme is toggled
      const observer = new MutationObserver(checkDarkMode);
      observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

      return () => observer.disconnect();
    }, []); 

    // Match the language from the className (e.g., "language-javascript")
    const match = /language-(\w+)/.exec(className || '');
    
    const currentTheme = isDarkMode ? vscDarkPlus : vs;

    // Render the SyntaxHighlighter for block code with a language, otherwise render a normal code tag
    return !inline && match ? (
      <SyntaxHighlighter
        style={currentTheme}
        language={match[1]}
        PreTag="div"
        {...props}
      >
        {String(children).replace(/\n$/, '')}
      </SyntaxHighlighter>
    ) : (
      <code className={className} {...props}>
        {children}
      </code>
    );
  }
};

export default CodeBlock;

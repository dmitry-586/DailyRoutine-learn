/**
 * CSS стили для HTML экспорта, соответствующие основной странице
 */
export const HTML_EXPORT_STYLES = `
  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    background: #2d3134;
    color: #ffffff;
    line-height: 1.625;
    max-width: 800px;
    margin: 0 auto;
    padding: 40px 20px;
  }
  h1 {
    font-size: 1.875rem;
    font-weight: 600;
    margin-bottom: 1.5rem;
    color: #ffffff;
  }
  h2 {
    font-size: 1.5rem;
    font-weight: 600;
    margin-top: 2rem;
    margin-bottom: 1rem;
    color: #ffffff;
  }
  h3 {
    font-size: 1.25rem;
    font-weight: 600;
    margin-top: 1.5rem;
    margin-bottom: 0.75rem;
    color: #ffffff;
  }
  h4 {
    font-size: 1.125rem;
    font-weight: 600;
    margin-top: 1rem;
    margin-bottom: 0.5rem;
    color: #ffffff;
  }
  h5 {
    font-size: 1rem;
    font-weight: 600;
    margin-top: 0.75rem;
    margin-bottom: 0.5rem;
    color: #ffffff;
  }
  h6 {
    font-size: 0.875rem;
    font-weight: 600;
    margin-top: 0.75rem;
    margin-bottom: 0.5rem;
    color: #ffffff;
  }
  p {
    font-size: 1rem;
    margin-bottom: 1rem;
    line-height: 1.625;
    color: #ffffff;
  }
  ul, ol {
    margin-bottom: 1rem;
    padding-left: 0;
    list-style-position: inside;
    color: #ffffff;
  }
  ul {
    list-style-type: disc;
  }
  ol {
    list-style-type: decimal;
  }
  li {
    line-height: 1.625;
    margin: 0.375rem 0;
  }
  blockquote {
    border-left: 4px solid #1cbecb;
    background: #3d4348;
    margin: 1rem 0;
    padding: 0.5rem 0 0.5rem 1rem;
    font-style: italic;
    color: #ffffff;
  }
  code {
    background: #252829;
    color: #b3b3b3;
    padding: 0.125rem 0.375rem;
    border-radius: 0.25rem;
    font-family: monospace;
    font-size: 0.875rem;
  }
  pre {
    background: #252829;
    color: #f3f4f6;
    padding: 1rem;
    border-radius: 0.5rem;
    margin-bottom: 1rem;
    overflow-x: auto;
    font-family: monospace;
    font-size: 0.875rem;
  }
  pre code {
    background: transparent;
    padding: 0;
    color: #f3f4f6;
  }
  a {
    color: #1cbecb;
    text-decoration: underline;
  }
  a:hover {
    opacity: 0.8;
  }
  strong {
    font-weight: 700;
    color: #ffffff;
  }
  em {
    font-style: italic;
    color: #ffffff;
  }
  hr {
    border: none;
    border-top: 2px solid #3d4348;
    margin: 2rem 0;
  }
  table {
    border-collapse: collapse;
    width: 100%;
    margin-bottom: 1rem;
  }
  th {
    border: 1px solid #3d4348;
    padding: 0.5rem;
    text-align: left;
    font-weight: 600;
    color: #ffffff;
  }
  td {
    border: 1px solid #3d4348;
    padding: 0.5rem;
    color: #ffffff;
  }
  img {
    max-width: 100%;
    height: auto;
    margin: 1rem 0;
    border-radius: 0.5rem;
  }
`.trim()

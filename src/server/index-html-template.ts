import { REACT_MOUNTING_POINT_ID } from '../constants/selectors';
export const renderIndexHtmlTemplate = (contentHtml, fullBundleUrl, styles) => (
  `<!doctype html>
    <html>
      <head>
        <title>Universal React App</title>
        <style type="text/css">
        ${styles}
        </style>
      </head>
      <body>
      <div id="${REACT_MOUNTING_POINT_ID}">
        ${contentHtml}
      </div>
      <script src="${fullBundleUrl}"></script>
      </body>
    </html>`);

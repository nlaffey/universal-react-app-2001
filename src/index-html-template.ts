import { REACT_MOUNTING_POINT_ID } from './constants/selectors';

export const renderIndexHtmlTemplate = (contentHtml, fullBundleUrl, props, styles) => (
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
      <script type="text/javascript">
        window.initialProps = ${JSON.stringify(props)}
        window.apiPath = ${process.env.PORT}
      </script>
      <script src="${fullBundleUrl}"></script>
      </body>
    </html>`);

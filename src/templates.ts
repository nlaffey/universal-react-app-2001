export const renderRootTemplate = (contentHtml, fullBundleUrl, props, styles) => {
  return `<!doctype html>
    <html>
      <head>
        <title>Taco cat</title>
        <style type="text/css">
        ${styles}
        </style>
      </head>
      <body>
        <div id="root">${contentHtml}</div>
        <script type="text/javascript">window.initialProps = ${JSON.stringify(props)}</script>
        <script src="${fullBundleUrl}"></script>
      </body>
    </html>`;
};
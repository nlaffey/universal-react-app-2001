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
        ${contentHtml}
        <script type="text/javascript">
        window.initialProps = ${JSON.stringify(props)}
        window.apiPath = ${process.env.PORT}
        </script>
        <script src="${fullBundleUrl}"></script>
      </body>
    </html>`;
};

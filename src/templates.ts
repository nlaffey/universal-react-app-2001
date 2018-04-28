export const renderRootTemplate = (contentHtml, fullBundleUrl, props) => {
  return `<!doctype html>
    <html>
      <head>
        <title>Taco cat</title>
      </head>
      <body>
        <div id="root">${contentHtml}</div>
        <script type="text/javascript">window.initialProps = ${JSON.stringify(props)}</script>
        <script src="${fullBundleUrl}"></script>
      </body>
    </html>`;
};

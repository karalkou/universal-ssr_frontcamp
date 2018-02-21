function renderFullPage() {
  return `
      <!doctype html>
      <html>
        <head>
          <meta charset=utf-8>
          <title>React Server Side Rendering</title>
          <style>
            html, body { height: 100%; margin: 0; padding: 0; }
            #root { height: 100%; box-sizing: border-box; font-family: 'Open Sans', 'Arial', sans-serif; background-color: #e6ecf0; }
          </style>
        </head>
        <body>
          <div id="root"></div>
          <script src="/js/bundle.js"></script>
        </body>
      </html>
  `;
}

function handleRender(req, res) {
  res.send(renderFullPage());
}

export default handleRender;

import * as express from 'express';
import * as React from 'react';
import { renderToString } from 'react-dom/server'
import { Brand } from './typings/contentful/Brand';
import { MenuCategory } from './typings/contentful/MenuCategory';
import { getEntriesOfType, getEntry } from './contentful/service';
import { typeIds } from './contentful/typeIds';
import * as path from 'path';
import { AppContainer } from "./components/AppContainer";
//webpack hot reloading middleware


declare var global: {
  appRootPath: string
};

let assetDomain = '/';
let bundlePath = "/public/bundle.js";
const fullBundleUrl = path.join(assetDomain, bundlePath);

export const setupApp = (serverCompiler) => {

  const app = express();

  app.get('/', async (req, res) => {
    const props = await AppContainer.getServerProps();
    const html = renderToString(<AppContainer {...props}/>);
    res.send(`
    <!doctype html>
    <html>
      <head>
        <title>Redux Universal Example</title>
      </head>
      <body>
      <h1>Another</h1>
        <div id="root">${html}</div>
        <script type="text/javascript">window.initialProps = ${JSON.stringify(props)}</script>
        <script src="${fullBundleUrl}"></script>
      </body>
    </html>`);
  });

  app.get('/data', async (req, res) => {
    const menuCategories = await getEntriesOfType<MenuCategory>(typeIds.MenuCategory);
    const brand = await getEntry<Brand>('3I483EqYbKMaQqwS6wWY0e');
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ menuCategories, brand }));
  });

  const publicPath = path.resolve(global.appRootPath, './public');
  app.use('/public', express.static(publicPath));
  return app;
};
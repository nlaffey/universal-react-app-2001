import * as express from 'express';
import * as React from 'react';
import * as path from 'path';
import * as compression from 'compression';
import { renderToString } from 'react-dom/server';
import { Brand } from './typings/contentful/Brand';
import { MenuCategory } from './typings/contentful/MenuCategory';
import { getEntriesOfType, getEntry } from './contentful/service';
import { typeIds } from './contentful/typeIds';
import { AppContainer } from './components/AppContainer';
import { StaticRouter } from 'react-router';
import { renderRootTemplate } from './templates';

declare var global: {
  appRootPath: string,
};

const assetDomain = '/';
const bundlePath = '/public/bundle.js';
const fullBundleUrl = path.join(assetDomain, bundlePath);

export const setupApp = () => {

  const app = express();

  app.use(compression());

  const routes = {
    '/menu': {},
    '/': {},
  };

  app.get('*', async (req, res, next) => {
    const route = routes[req.url];
    if (route) {
      const props = await AppContainer.getServerProps();
      const contentHtml = renderToString(
        <StaticRouter location={req.url} context={{}}>
          <AppContainer {...props}/>
        </StaticRouter>,
      );
      res.send(renderRootTemplate(contentHtml, fullBundleUrl, props));
    } else {
      next();
    }
  });

  app.get('/menu', async (req, res) => {
    const props = await AppContainer.getServerProps();
    const contentHtml = renderToString(
      <StaticRouter location={req.url} context={{}}>
        <AppContainer {...props}/>
      </StaticRouter>,
    );
    res.send(renderRootTemplate(contentHtml, fullBundleUrl, props));
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

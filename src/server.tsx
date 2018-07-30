import * as express from 'express';
import * as React from 'react';
import * as path from 'path';
import * as compression from 'compression';
import { renderToString } from 'react-dom/server';
import { Brand } from './typings/contentful/Brand';
import { MenuCategory } from './typings/contentful/MenuCategory';
import { getEntriesOfType, getEntry } from './contentful/service';
import { typeIds } from './contentful/typeIds';
import { renderRootTemplate } from './templates';
import { router, getRouteCss, insertCss } from './router';
import { getInitialProps } from './getInitialProps';
import { AppContainerInitialProps } from './components/AppContainer';
import { APP_CONTAINER_PROPS_PATH, MENU_PROPS_PATH } from './constants/pathNames';
import { MenuProps } from './components/Menu';

declare var global: {
  appRootPath: string,
};

const assetDomain = '/';
const bundlePath = '/public/bundle.js';
const fullBundleUrl = path.join(assetDomain, bundlePath);

// noinspection JSUnusedGlobalSymbols -- Used in startServer.js
export const setupApp = () => {

  const app = express();

  app.use(compression());

  app.get('*', async (req, res, next) => {
    const pathname = req.url;
    const context = { insertCss };
    const resolveObject = { pathname, context };
    router.resolve(resolveObject).then(async (component) => {
      try {
        const initialProps = await getInitialProps(component);
        const resolveObjectWithProps = { ...resolveObject, initialProps };
        router.resolve(resolveObjectWithProps).then((componentWithProps) => {
          const componentHtml = renderToString(componentWithProps);
          const css = getRouteCss();
          const html = renderRootTemplate(componentHtml, fullBundleUrl, initialProps, css);
          res.send(html);
        });
      } catch (err) {
        res.send(err.stack);
      }
    }).catch(() => {
      next();
    });
  });

  app.get('/' + APP_CONTAINER_PROPS_PATH, async (req, res) => {
    const brand = await getEntry<Brand>('3I483EqYbKMaQqwS6wWY0e');
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Cache-Control', 'public, max-age=31536000');
    const dataResponseObject: AppContainerInitialProps = {
      brand
    };
    res.send(JSON.stringify(dataResponseObject));
  });

  app.get('/' + MENU_PROPS_PATH, async (req, res) => {
    const menuCategories = await getEntriesOfType<MenuCategory>(typeIds.MenuCategory);
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Cache-Control', 'public, max-age=31536000');
    const dataResponseObject: MenuProps = {
      menuCategories,
    };
    res.send(JSON.stringify(dataResponseObject));
  });

  const publicPath = path.resolve(global.appRootPath, './public');
  app.use('/public', express.static(publicPath));

  return app;
};

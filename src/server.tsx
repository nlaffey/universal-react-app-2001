import * as express from 'express';
import * as React from 'react';
import * as path from 'path';
import * as compression from 'compression';
import { renderToString } from 'react-dom/server';
import { router } from './router';
import * as url from 'url';
import { getInitialProps, InitialPropsContext } from './getInitialProps';
import { renderIndexHtmlTemplate } from './index-html-template';
import { getEntry } from './contentful/service';
import { CONTENTFUL_ENTRY_ID_PATH } from './constants/pathnames';
import { getRouteCss, insertCss } from './utils/css';

declare var global: {
  appRootPath: string,
};

const assetDomain = '/';
const bundlePath = '/public/bundle.js';
const fullBundleUrl = path.join(assetDomain, bundlePath);

export type ResolveObject = {
  pathname: string;
  query: string;
  // TODO: Rename this to stylesContext? Is this being used for anything else?
  context: { insertCss: (...styles) => void }
};

// noinspection JSUnusedGlobalSymbols -- Used in startServer.js
export const setupApp = (port) => {
  const app = express();

  app.use(compression());

  app.get('*', async (req, res, next) => {
    const parsedUrl = url.parse(req.url);
    const { query, pathname } = parsedUrl;
    const context = { insertCss };
    const resolveObject: ResolveObject = { pathname, query, context };
    router.resolve(resolveObject).then(async (component) => {
      try {
        const initialPropsContext: InitialPropsContext = { port, resolveObject };
        const initialProps = await getInitialProps(component, initialPropsContext);
        const resolveObjectWithProps = { ...resolveObject, initialProps };
        router.resolve(resolveObjectWithProps).then((componentWithProps) => {
          const componentHtml = renderToString(componentWithProps);
          const css = getRouteCss();
          const html = renderIndexHtmlTemplate(componentHtml, fullBundleUrl, initialProps, css);
          res.send(html);
        });
      } catch (err) {
        // TODO: Handle this more gracefully in production
        res.send(err.stack);
      }
    }).catch((err) => {
      if (err.status !== 404) {
        console.error(err);
      }
      next();
    });
  });

  app.get(CONTENTFUL_ENTRY_ID_PATH, async (req, res) => {
    const { entryId } = req.params;
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Cache-Control', 'public, max-age=31536000');
    const entryData = await getEntry(entryId);
    res.send(JSON.stringify(entryData));
  });

  const publicPath = path.resolve(global.appRootPath, './public');
  app.use('/public', express.static(publicPath));

  return app;
};

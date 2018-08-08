import * as express from 'express';
import * as React from 'react';
import * as compression from 'compression';
import { renderToString } from 'react-dom/server';
import { CONTENTFUL_ENTRY_ID_PATH, FULL_PUBLIC_PATH, PUBLIC_PATH } from './constants/pathnames';
import { createRouteHandlers } from './server/routes';

export const createApp = (port) => {
  const app = express();
  const routes = createRouteHandlers(port);

  app.use(compression());
  app.get('*', routes.handleWildcardComponentRendering);
  app.get(CONTENTFUL_ENTRY_ID_PATH, routes.handleContentfulGetRequest);
  app.use(PUBLIC_PATH, express.static(FULL_PUBLIC_PATH));

  return app;
};

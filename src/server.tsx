import * as express from 'express';
import * as React from 'react';
import * as compression from 'compression';
import { renderToString } from 'react-dom/server';
import { CONTENTFUL_ENTRY_ID_PATH, FULL_PUBLIC_PATH, PUBLIC_PATH } from './constants/pathnames';
import appRouteService from './server/appRouteService';
import appUniversalRouter from './appUniversalRouter';

export const createApp = (port) => {
  const app = express();
  const routes = appRouteService.createAppRouteHandlers(port, appUniversalRouter);
  app.use(compression());

  app.get('*', routes.handleUniversalRouterComponentRendering);
  app.get(CONTENTFUL_ENTRY_ID_PATH, routes.handleContentfulGetRequest);
  app.use(PUBLIC_PATH, express.static(FULL_PUBLIC_PATH));

  return app;
};

import * as express from 'express';
import * as React from 'react';
import * as compression from 'compression';
import { renderToString } from 'react-dom/server';
import { CONTENTFUL_ENTRY_ID_PATH, PUBLIC_PATH } from './constants/pathnames';
import appRouteService from './server/appRouteService';
import appUniversalRouter from './appUniversalRouter';
import * as path from 'path';

declare var global: {
  APP_ROOT_PATH: string,
};

export const createApp = (port) => {
  const app = express();
  const routes = appRouteService.createAppRouteHandlers({ port, universalRouter: appUniversalRouter });
  app.use(compression());

  app.get('*', routes.handleUniversalRouterComponentRendering);
  app.get(CONTENTFUL_ENTRY_ID_PATH, routes.handleContentfulGetRequest);
  app.use(PUBLIC_PATH, express.static(path.join(global.APP_ROOT_PATH, PUBLIC_PATH)));

  return app;
};

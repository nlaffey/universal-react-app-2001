import * as express from 'express';
import * as React from 'react';
import * as compression from 'compression';
import * as path from 'path';
import { renderToString } from 'react-dom/server';
import { CONTENTFUL_ENTRY_ID_PATH, PUBLIC_PATH } from '../constants/pathnames';
import appRouteService from './appRouteService';
import appUniversalRouter from '../universal-router/appUniversalRouter';

declare var global: {
  APP_ROOT_PATH: string,
};

export const createApp = (port) => {
  const app = express();
  const routes = appRouteService.createAppRouteHandlers({ port, universalRouter: appUniversalRouter });
  const { handleContentfulGetRequest, handleUniversalRouterComponentRendering } = routes;

  app.use(compression());

  app.get('*', handleUniversalRouterComponentRendering);
  app.get(CONTENTFUL_ENTRY_ID_PATH, handleContentfulGetRequest);

  app.use(PUBLIC_PATH, express.static(path.join(global.APP_ROOT_PATH, PUBLIC_PATH)));

  return app;
};

export default createApp;

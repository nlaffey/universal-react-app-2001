import * as url from 'url';
import { getRouteCss, insertCss } from '../utils/css';
import getInitialPropsRecursively, { InitialPropsContext } from '../utils/getInitialPropsRecursively';
import { renderToString } from 'react-dom/server';
import { renderIndexHtmlTemplate } from './index-html-template';
import { getEntry } from '../services/contentful/contentfulService';
import { FULL_BUNDLE_URL } from '../constants/pathnames';
import { ResolveContext } from '../typings/server';
import { NextFunction, Request, Response } from 'express';
// noinspection TsLint
import UniversalRouter from 'universal-router';

type RouteHandlerContext = { port: number, universalRouter: any };

export type AppRouteHandlers = {
  handleUniversalRouterComponentRendering: (req: Request, res: Response, next: NextFunction) => Promise<void>
  handleContentfulGetRequest: (req: Request, res: Response, next: NextFunction) => Promise<void>
};

export type CreateAppRouteHandlers = (routeHandlerContext: RouteHandlerContext) => AppRouteHandlers;

/**
 *
 */
async function resolveComponentAndInitialPropsWithUniversalRouter(universalRouter: UniversalRouter, resolveContext: ResolveContext, port: number) {
  const component = await universalRouter.resolve(resolveContext);
  const initialPropsContext: InitialPropsContext = { port, resolveContext };
  const initialProps = await getInitialPropsRecursively(component, initialPropsContext);
  const resolveContextWithProps = { ...resolveContext, initialProps };
  return await universalRouter.resolve(resolveContextWithProps);
}

const createAppRouteHandlers: CreateAppRouteHandlers =
  function createAppRouteHandlers(routeHandlerContext: RouteHandlerContext): AppRouteHandlers {
    const { port, universalRouter } = routeHandlerContext;

    async function handleUniversalRouterComponentRendering(req: Request, res: Response, next: NextFunction) {
      const parsedUrl = url.parse(req.url);
      const { query, pathname } = parsedUrl;
      const context = { insertCss };
      const resolveObject: ResolveContext = { pathname, query, context };
      try {
        const componentWithProps = await resolveComponentAndInitialPropsWithUniversalRouter(universalRouter, resolveObject, port);
        const componentHtml = renderToString(componentWithProps);
        const css = getRouteCss();
        const html = renderIndexHtmlTemplate(componentHtml, FULL_BUNDLE_URL, css);
        res.send(html);
      } catch (err) {
        if (err.status !== 404) {
          console.error(err);
        }
        next();
      }
    }

    async function handleContentfulGetRequest(req: Request, res: Response) {
      const { entryId } = req.params;
      res.setHeader('Content-Type', 'application/json');
      res.setHeader('Cache-Control', 'public, max-age=31536000');
      const entryData = await getEntry(entryId);
      res.send(JSON.stringify(entryData));
    }

    return {
      handleUniversalRouterComponentRendering,
      handleContentfulGetRequest
    };
  };

export type AppRouteService = { createAppRouteHandlers: CreateAppRouteHandlers };
const appRouteService: AppRouteService = { createAppRouteHandlers };

export default appRouteService;

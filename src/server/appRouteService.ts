import * as url from 'url';
import { getRouteCss, insertCss } from '../utils/css';
import { getInitialProps, InitialPropsContext } from '../utils/getInitialProps';
import { renderToString } from 'react-dom/server';
import { renderIndexHtmlTemplate } from './index-html-template';
import { getEntry } from '../services/contentful/contentfulService';
import { FULL_BUNDLE_URL } from '../constants/pathnames';
import { ResolveObject } from '../typings/server';
import { NextFunction, Response, Request } from 'express';

type RouteHandlerContext = { port: number, universalRouter: any };

export type AppRouteHandlers = {
  handleUniversalRouterComponentRendering: (req: Request, res: Response, next: NextFunction) => Promise<void>
  handleContentfulGetRequest: (req: Request, res: Response, next: NextFunction) => Promise<void>
};

export type CreateAppRouteHandlers = (routeHandlerContext: RouteHandlerContext) => AppRouteHandlers;
const createAppRouteHandlers: CreateAppRouteHandlers =
  function createAppRouteHandlers(routeHandlerContext: RouteHandlerContext): AppRouteHandlers {
    const { port, universalRouter } = routeHandlerContext;

    async function handleUniversalRouterComponentRendering(req: Request, res: Response, next: NextFunction) {
      const parsedUrl = url.parse(req.url);
      const { query, pathname } = parsedUrl;
      const context = { insertCss };
      const resolveObject: ResolveObject = { pathname, query, context };
      try {
        const component = await universalRouter.resolve(resolveObject);
        const initialPropsContext: InitialPropsContext = { port, resolveObject };
        const initialProps = await getInitialProps(component, initialPropsContext);
        const resolveObjectWithProps = { ...resolveObject, initialProps };
        const componentWithProps = await universalRouter.resolve(resolveObjectWithProps);
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

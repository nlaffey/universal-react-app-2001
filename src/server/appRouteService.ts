import * as url from 'url';
import { getRouteCss, insertCss } from '../utils/css';
import { getInitialProps, InitialPropsContext } from '../utils/getInitialProps';
import { renderToString } from 'react-dom/server';
import { renderIndexHtmlTemplate } from '../index-html-template';
import { getEntry } from '../contentful/service';
import { FULL_BUNDLE_URL } from '../constants/pathnames';
import { ResolveObject } from '../typings/server';
import { NextFunction, Response, Request } from 'express';

export type AppRouteHandlers = {
  handleUniversalRouterComponentRendering: (req: Request, res: Response, next: NextFunction) => Promise<void>
  handleContentfulGetRequest: (req: Request, res: Response, next: NextFunction) => Promise<void>
};

export type CreateAppRouteHandlers = (port: number, universalRouter) => AppRouteHandlers;

const createAppRouteHandlers: CreateAppRouteHandlers =
  function createAppRouteHandlers(port: number, universalRouter): AppRouteHandlers {

    async function handleUniversalRouterComponentRendering(req: Request, res: Response, next: NextFunction) {
      const parsedUrl = url.parse(req.url);
      const { query, pathname } = parsedUrl;
      const context = { insertCss };
      const resolveObject: ResolveObject = { pathname, query, context };
      universalRouter.resolve(resolveObject).then(async (component) => {
        try {
          const initialPropsContext: InitialPropsContext = { port, resolveObject };
          const initialProps = await getInitialProps(component, initialPropsContext);
          const resolveObjectWithProps = { ...resolveObject, initialProps };
          universalRouter.resolve(resolveObjectWithProps).then((componentWithProps) => {
            const componentHtml = renderToString(componentWithProps);
            const css = getRouteCss();
            const html = renderIndexHtmlTemplate(componentHtml, FULL_BUNDLE_URL, initialProps, css);
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

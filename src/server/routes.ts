import * as url from 'url';
import { getRouteCss, insertCss } from '../utils/css';
import { router } from '../router';
import { getInitialProps, InitialPropsContext } from '../getInitialProps';
import { renderToString } from 'react-dom/server';
import { renderIndexHtmlTemplate } from '../index-html-template';
import { getEntry } from '../contentful/service';
import { FULL_BUNDLE_URL } from '../constants/pathnames';
import { ResolveObject } from '../typings/server';

export function createRouteHandlers(port: number) {

  async function handleWildcardComponentRendering(req, res, next) {
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

  async function handleContentfulGetRequest(req, res) {
    const { entryId } = req.params;
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Cache-Control', 'public, max-age=31536000');
    const entryData = await getEntry(entryId);
    res.send(JSON.stringify(entryData));
  }

  return {
    handleWildcardComponentRendering,
    handleContentfulGetRequest
  };
}

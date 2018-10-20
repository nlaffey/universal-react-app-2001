import * as ReactDOM from 'react-dom';
import { ResolveContext } from '../typings/server';
import { insertCss } from '../utils/css';
import appUniversalRouter from '../universal-router/appUniversalRouter';
import getInitialPropsRecursively, { InitialPropsContext } from '../utils/getInitialPropsRecursively';

declare global {
  // noinspection TsLint
  interface Window {
    initialProps: Object;
  }
}

export interface AppLocation {
  pathname: string;
  search: string;
}

export type RenderRoute = (location: AppLocation, mountingElement: HTMLElement, hydrate?: boolean) => Promise<{}>;
export const renderRoute: RenderRoute =
  async function renderRoute(location: AppLocation, mountingElement: HTMLElement, hydrate?: boolean) {
    return new Promise(async (resolve) => {
      const resolveObject: ResolveContext = {
        pathname: location.pathname,
        query: location.search,
        context: { insertCss }
      };
      const component = await appUniversalRouter.resolve(resolveObject);
      const initialPropsContext: InitialPropsContext = { resolveContext: resolveObject, port: null };
      const initialProps = await getInitialPropsRecursively(component, initialPropsContext);
      const resolveObjectWithProps = { ...resolveObject, initialProps };
      const componentWithProps = await appUniversalRouter.resolve(resolveObjectWithProps);
      if (hydrate) {
        resolve(ReactDOM.hydrate(componentWithProps, mountingElement));
      } else {
        resolve(ReactDOM.render(componentWithProps, mountingElement));
      }
    });
  };

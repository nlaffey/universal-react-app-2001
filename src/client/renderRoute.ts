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

export async function renderRoute(location: AppLocation, mountingElement: HTMLElement, hydrate?: boolean) {
  const resolveObject: ResolveContext = {
    pathname: location.pathname,
    query: location.search,
    context: { insertCss }
  };
  try {
    const component = await appUniversalRouter.resolve(resolveObject);
    const initialPropsContext: InitialPropsContext = { resolveContext: resolveObject, port: null };
    const initialProps = await getInitialPropsRecursively(component, initialPropsContext);
    const resolveObjectWithProps = { ...resolveObject, initialProps };
    const componentWithProps = await appUniversalRouter.resolve(resolveObjectWithProps);
    if (hydrate) {
      ReactDOM.hydrate(componentWithProps, mountingElement);
    } else {
      ReactDOM.render(componentWithProps, mountingElement);
    }
  } catch (error) {
    console.error(error);
  }
}

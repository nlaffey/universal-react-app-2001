import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { router } from './router';
import { getInitialProps, InitialPropsContext } from './getInitialProps';
import { insertCss } from './utils/css';
import { REACT_MOUNTING_POINT_ID } from './constants/selectors';
import appHistory from './appHistory';
import { ResolveObject } from './server';

declare global {
  // noinspection TsLint
  interface Window {
    initialProps: Object;
  }
}

const mountingPoint = document.getElementById(REACT_MOUNTING_POINT_ID);

const getResolveObject = (location: Location): ResolveObject => {
  const resolveObject: ResolveObject = {
    pathname: location.pathname,
    query: location.search,
    context: { insertCss }
  };
  return resolveObject;
};

interface Location {
  hash: string;
  key: string;
  pathname: string;
  search: string;
  state: { isInitialRender: boolean };
}

const renderRoute = (location: Location) => {
  const resolveObject = getResolveObject(location);
  router.resolve(resolveObject).then(async (component) => {
    // We don't need to get initialProps if this is the initialRender, we already retrieved these on the server.
    let initialProps;
    const initialPropsContext: InitialPropsContext = {
      resolveObject,
      port: null
    };
    const isInitialRender = location.state && location.state.isInitialRender;
    if (isInitialRender) {
      initialProps = window.initialProps;
    } else {
      initialProps = await getInitialProps(component, initialPropsContext);
    }
    const resolveObjectWithProps = { ...resolveObject, initialProps };
    router.resolve(resolveObjectWithProps).then((componentWithProps) => {
      if (isInitialRender) {
        ReactDOM.hydrate(componentWithProps, mountingPoint);
      } else {
        ReactDOM.hydrate(componentWithProps, mountingPoint);
      }
    });
  });
};

const initialRoute: Location = {
  hash: null,
  key: null,
  pathname: window.location.pathname,
  search: window.location.search,
  state: { isInitialRender: true }
};

renderRoute(initialRoute);

appHistory.listen(renderRoute);

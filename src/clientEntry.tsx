import * as React from 'react';
import * as ReactDOM from 'react-dom';
import appUniversalRouter from './appUniversalRouter';
import { getInitialProps, InitialPropsContext } from './utils/getInitialProps';
import { insertCss } from './utils/css';
import { REACT_MOUNTING_POINT_ID } from './constants/selectors';
import appHistory from './appHistory';
import { ResolveObject } from './typings/server';

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

async function renderRoute(location: Location) {
  try {
    const resolveObject = getResolveObject(location);
    const component = await appUniversalRouter.resolve(resolveObject);
    // We don't need to get initialProps if this is the initialRender, we already retrieved these on the server.
    const initialPropsContext: InitialPropsContext = { resolveObject, port: null };
    let initialProps;
    const isInitialRender = location.state && location.state.isInitialRender;
    if (isInitialRender) {
      initialProps = window.initialProps;
    } else {
      initialProps = await getInitialProps(component, initialPropsContext);
    }
    const resolveObjectWithProps = { ...resolveObject, initialProps };
    const componentWithProps = await appUniversalRouter.resolve(resolveObjectWithProps);
    if (isInitialRender) {
      ReactDOM.hydrate(componentWithProps, mountingPoint);
    } else {
      ReactDOM.render(componentWithProps, mountingPoint);
    }
  } catch (error) {
    console.error(error);
  }
}

const initialRoute: Location = {
  hash: null,
  key: null,
  pathname: window.location.pathname,
  search: window.location.search,
  state: { isInitialRender: true }
};

// noinspection JSIgnoredPromiseFromCall
renderRoute(initialRoute);

appHistory.listen(renderRoute);

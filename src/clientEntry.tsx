import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { insertCss, router } from './router';
import history from './history';
import { getInitialProps } from './getInitialProps';


declare global {
  // noinspection TsLint
  interface Window {
    initialProps: Object;
  }
}

const mountingPoint = document.getElementById('root');
const getResolveObject = (location: Location) => {
  const pathname = location.pathname;
  const context = { insertCss };
  return { pathname, context };
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
    // We don't need to get initialProps if this is the initialRender,
    // we already retrieved these on the server.
    let initialProps;
    const isInitialRender = location.state && location.state.isInitialRender;
    if (isInitialRender) {
      initialProps = window.initialProps;
    } else {
      initialProps = await getInitialProps(component, null);
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
  search: null,
  state: { isInitialRender: true }
};

renderRoute(initialRoute);

history.listen(renderRoute);



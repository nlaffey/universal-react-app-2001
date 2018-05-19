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
  state: { isInitialRoute: boolean };
}

const renderRoute = (location: Location) => {
  const resolveObject = getResolveObject(location);
  router.resolve(resolveObject).then(async (component) => {
    // We don't need to get initialProps if this is the initialRender, we already retrieved these
    // on the server.
    let initialProps;
    if (!location.state || !location.state.isInitialRoute) {
      initialProps = await getInitialProps(component);
    } else {
      initialProps = window.initialProps;
    }
    const resolveObjectWithProps = { ...resolveObject, initialProps };
    router.resolve(resolveObjectWithProps).then((componentWithProps) => {
      ReactDOM.render(componentWithProps, mountingPoint);
    });
  });
};

const initialRoute: Location = {
  hash: null,
  key: null,
  pathname: window.location.pathname,
  search: null,
  state: { isInitialRoute: true }
};

renderRoute(initialRoute);

history.listen(renderRoute);



import * as universalRouter from 'universal-router';
import * as React from 'react';
import AppContainer, { AppContainerInitialProps } from './components/AppContainer';
import ContextProvider from './components/ContextProvider';

export const cssSet = new Set();
export const insertCss = (...styles) => {
  const isClient = typeof window !== 'undefined';
  styles.forEach((style) => {
    if (style._insertCss || style._getCss) {
      const css = isClient ? style._insertCss() : style._getCss();
      cssSet.add(css);
    }
  });
};

export const getRouteCss = () => {
  const cssArray = [];
  cssSet.forEach(css => cssArray.push(css));
  return cssArray.join('');
};

interface AppContext {
  insertCss?: Function;
  appContainerProps?: AppContainerInitialProps;
}

const context: AppContext = {
  insertCss,
};

interface InitPropsDefaultValue {
  AppContainer: AppContainerInitialProps;
}

export const InitPropsContext = React.createContext<InitPropsDefaultValue>({ AppContainer: null });

export const routes = [
  {
    path: '/',
    action: routerContext => (
      <InitPropsContext.Provider value={routerContext.initialProps}>
        <ContextProvider context={context}>
          <AppContainer>
            <h2>Home</h2>
          </AppContainer>
        </ContextProvider>
      </InitPropsContext.Provider>
    ),
  },
  {
    path: '/menu',
    action: routerContext => (
      <InitPropsContext.Provider value={routerContext.initialProps}>
        <ContextProvider context={context}>
          <AppContainer>
            <h2>Menu</h2>
          </AppContainer>
        </ContextProvider>
      </InitPropsContext.Provider>),
  },
];

// TODO: Fix type hack.
// noinspection TsLint
const UniversalRouter: any = universalRouter.default ? universalRouter.default : universalRouter;
export const router = new UniversalRouter(routes);

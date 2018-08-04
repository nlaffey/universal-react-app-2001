import * as universalRouter from 'universal-router';
import * as React from 'react';
import AppContainer, { AppContainerInitialProps } from './components/AppContainer';
import StyleContextProvider from './components/StyleContextProvider';
import Home from './components/Home';
import { ROOT_PATH } from './constants/pathnames';

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
  insertCss
};

interface InitPropsDefaultValue {
  AppContainer: AppContainerInitialProps;
}

export const InitPropsContext = React.createContext<InitPropsDefaultValue>(
  {
    AppContainer: null
  }
);

export const routes = [
  {
    path: ROOT_PATH,
    action: (routerContext) => {
      return (
        <RouteContextWrapper initialProps={routerContext.initialProps}>
          <AppContainer>
            <h1>Root</h1>
          </AppContainer>
        </RouteContextWrapper>
      );
    }
  },
  {
    path: '/home',
    action: routerContext => (
      <RouteContextWrapper initialProps={routerContext.initialProps}>
        <AppContainer>
          <Home/>
        </AppContainer>
      </RouteContextWrapper>
    )
  }
];

interface AppWrapperProps {
  initialProps: any;
}

class RouteContextWrapper extends React.Component<AppWrapperProps> {
  render() {
    return (
      <InitPropsContext.Provider value={this.props.initialProps}>
        <StyleContextProvider context={context}>
          {this.props.children}
        </StyleContextProvider>
      </InitPropsContext.Provider>);
  }
}

// TODO: Fix type hack.
// noinspection TsLint
const UniversalRouter: any = universalRouter.default ? universalRouter.default : universalRouter;
export const router = new UniversalRouter(routes);

import * as universalRouter from 'universal-router';
import * as React from 'react';
import AppContainer, { AppContainerInitialProps } from './components/AppContainer';
import StyleContextProvider from './components/StyleContextProvider';
import Menu, { MenuProps } from './components/Menu';

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
  Menu: MenuProps;
}

export const InitPropsContext = React.createContext<InitPropsDefaultValue>(
  {
    AppContainer: null,
    Menu: null
  }
);

export const routes = [
  {
    path: '/',
    action: routerContext => (
      <RouteContextWrapper initialProps={routerContext.initialProps}>
        <AppContainer>
          <h2>Home</h2>
        </AppContainer>
      </RouteContextWrapper>
    ),
  },
  {
    path: '/menu',
    action: routerContext => (
      <RouteContextWrapper initialProps={routerContext.initialProps}>
        <AppContainer>
          <Menu/>
        </AppContainer>
      </RouteContextWrapper>
    ),
  },
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

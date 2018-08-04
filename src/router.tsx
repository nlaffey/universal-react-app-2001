import * as universalRouter from 'universal-router';
import * as React from 'react';
import AppContainer from './components/AppContainer';
import { PAGE1_PATH, ROOT_PATH } from './constants/pathnames';
import Navigation from './components/Navigation';
import Page1 from './components/Page1';
import Root from './components/Root';
import RouteContextWrapper from './components/RouteContextWrapper';

// TODO: Reduce the boilerplate of the wrapper components while still keeping it easily configurable
export const routes = [
  {
    path: ROOT_PATH,
    action: (routerContext) => {
      return (
        <RouteContextWrapper initialProps={routerContext.initialProps}>
          <AppContainer>
            <Navigation/>
            <Root/>
          </AppContainer>
        </RouteContextWrapper>
      );
    }
  },
  {
    path: PAGE1_PATH,
    action: routerContext => (
      <RouteContextWrapper initialProps={routerContext.initialProps}>
        <AppContainer>
          <Navigation/>
          <Page1/>
        </AppContainer>
      </RouteContextWrapper>
    )
  }
];

// TODO: Fix type hack.
// noinspection TsLint
const UniversalRouter: any = universalRouter.default ? universalRouter.default : universalRouter;
export const router = new UniversalRouter(routes);

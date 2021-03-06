import * as universalRouter from 'universal-router';
import * as React from 'react';
import AppContainer from '../components/AppContainer';
import { BOOK_QUERY_PATH, ROOT_PATH } from '../constants/pathnames';
import Root from '../components/Root';
import BookQueryPage from '../components/BookQueryPage';
import RouteContextWrapper from '../components/RouteContextWrapper';

// TODO: Reduce the boilerplate of the wrapper components while still keeping it easily configurable
export const routes = [
  {
    path: ROOT_PATH,
    action: (routerContext) => {
      return (
        <RouteContextWrapper initialProps={routerContext.initialProps}>
          <AppContainer>
            <Root/>
          </AppContainer>
        </RouteContextWrapper>
      );
    }
  },
  {
    path: BOOK_QUERY_PATH,
    action: routerContext => (
      <RouteContextWrapper initialProps={routerContext.initialProps}>
        <AppContainer>
          <BookQueryPage/>
        </AppContainer>
      </RouteContextWrapper>
    )
  }
];

// TODO: Fix type hack.
// noinspection TsLint
const UniversalRouter: any = universalRouter.default ? universalRouter.default : universalRouter;
const appUniversalRouter = new UniversalRouter(routes);
export default appUniversalRouter;

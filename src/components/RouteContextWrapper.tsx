import StyleContextProvider from './StyleContextProvider';
import * as React from 'react';
import { AppContainerInitialProps } from './AppContainer';
import { insertCss } from '../utils/css';

interface InitPropsDefaultValue {
  AppContainer: AppContainerInitialProps;
}

export const InitPropsContext = React.createContext<InitPropsDefaultValue>(
  {
    AppContainer: null
  }
);

interface AppContext {
  insertCss?: Function;
  appContainerProps?: AppContainerInitialProps;
}

const context: AppContext = {
  insertCss
};

interface RouteContextWrapperProps {
  initialProps: any;
}

class RouteContextWrapper extends React.Component<RouteContextWrapperProps> {
  render() {
    return (
      <InitPropsContext.Provider value={this.props.initialProps}>
        <StyleContextProvider context={context}>
          {this.props.children}
        </StyleContextProvider>
      </InitPropsContext.Provider>);
  }
}

export default RouteContextWrapper;
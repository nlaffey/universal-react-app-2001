import * as React from 'react';
import { InitPropsContext } from './RouteContextWrapper';

export const withInitialProps = (ComposedComponent, initialPropsId, initialProps) => {

  ComposedComponent.initialPropsId = initialPropsId;

  class WithInitialProps extends React.Component {
    static displayName: string;
    static ComposedComponent: any;
    static contextTypes: any;

    static async getInitialProps(port) {
      const data = await initialProps(port);
      return { data, id: ComposedComponent.initialPropsId };
    }

    render() {
      return (
        <InitPropsContext.Consumer>
          {(initProps) => {
            const componentInitialProps = initProps[ComposedComponent.initialPropsId];
            if (!componentInitialProps) {
              console.warn(`No initial props found for ${ComposedComponent.initialPropsId}`);
            }
            const props = { ...this.props, ...componentInitialProps };
            let composedComponent;
            try {
              composedComponent = <ComposedComponent {...props}/>;
            } catch (error) {
              console.error(error);
            }
            return composedComponent;
          }}
        </InitPropsContext.Consumer>
      );
    }
  }

  const displayName = ComposedComponent.displayName || ComposedComponent.name || 'Component';
  WithInitialProps.displayName = `WithInitialProps(${displayName})`;
  WithInitialProps.ComposedComponent = ComposedComponent;
  return WithInitialProps;
};

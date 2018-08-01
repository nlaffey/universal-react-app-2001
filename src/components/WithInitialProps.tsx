import * as React from 'react';
import { InitPropsContext } from '../router';

export const withInitialProps = (ComposedComponent, initialProps) => {

    class WithInitialProps extends React.Component {
      static displayName: string;
      static ComposedComponent: any;
      static contextTypes: any;

      static async getInitialProps(port) {
        const data = await initialProps(port);
        return {
          data,
          id: ComposedComponent.name
        };
      }

      render() {
        return (
          <InitPropsContext.Consumer>
            {(initProps) => {
              const componentInitialProps = initProps[ComposedComponent.name];
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
  }
;

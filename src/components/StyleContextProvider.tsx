import * as React from 'react';
import * as PropTypes from 'prop-types';

interface StyleContextProviderProps {
  context: any;
}

export default class StyleContextProvider extends React.Component<StyleContextProviderProps> {

  static childContextTypes = {
    insertCss: PropTypes.func
  };

  getChildContext() {
    return this.props.context;
  }

  render() {
    return (
      <React.Fragment>
        {this.props.children}
      </React.Fragment>
    );
  }
}

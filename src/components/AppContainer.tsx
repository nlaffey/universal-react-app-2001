import * as React from 'react';
import { Brand } from '../typings/contentful/Brand';
import { Entry } from 'contentful';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { APP_CONTAINER_PROPS_PATH } from '../constants/pathNames';
import { withInitialProps } from './WithInitialProps';
import { getInitialPropsData } from '../utils/environment';

const styles = require('./AppContainer.css');

export interface AppContainerInitialProps {
  brand: Entry<Brand>;
}

class AppContainer extends React.Component<AppContainerInitialProps> {

  render() {
    const { brand } = this.props;
    return (
      <div className={styles.container}>{brand.fields.siteName}</div>);
  }
}

const getInitialProps = async port => getInitialPropsData(APP_CONTAINER_PROPS_PATH, port);
const AppContainerWithInitialProps = withInitialProps(AppContainer, 'AppContainer', getInitialProps);
const AppContainerWithStylesAndInitialProps = withStyles(styles)(AppContainerWithInitialProps);

export default AppContainerWithStylesAndInitialProps;

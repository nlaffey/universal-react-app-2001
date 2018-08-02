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

export interface AppContainerState {
  assetsUrl: string;
  brand: Entry<Brand>;
}

class AppContainer extends React.Component<AppContainerInitialProps, AppContainerState> {

  public static initialPropsId: string = 'AppContainerInitialProps';

  render() {
    console.log(`AppContainerRenderProps:${JSON.stringify(this.props)}`);
    const { brand } = this.props;
    return (
      <span id="mounting-point" className={styles.container}>
        {brand.fields.companyName}
      </span>);
  }
}


const getInitialProps = async port => getInitialPropsData(APP_CONTAINER_PROPS_PATH, port);

const AppContainerWithInitialProps = withInitialProps(AppContainer, getInitialProps);
const AppContainerWithStylesAndInitialProps = withStyles(styles)(AppContainerWithInitialProps);

export default AppContainerWithStylesAndInitialProps;

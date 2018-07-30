import * as React from 'react';
import * as fetch from 'isomorphic-fetch';
import { Brand } from '../typings/contentful/Brand';
import Navigation from './Navigation';
import { Entry } from 'contentful';
import Footer from './Footer';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { APP_CONTAINER_PROPS_PATH, MENU_PROPS_PATH } from '../constants/pathNames';
import { withInitialProps } from './WithInitialProps';
import { getApiUrl, getInitialPropsData, getInitialPropsUrl } from '../utils/environment';

const styles = require('./AppContainer.css');

export interface AppContainerInitialProps {
  brand: Entry<Brand>;
}

export interface AppContainerState {
  assetsUrl: string;
  brand: Entry<Brand>;
}

class AppContainer extends React.Component<AppContainerInitialProps, AppContainerState> {

  render() {
    return (
      <div className={styles.container}>
        <Navigation/>
        <h1>App container for {this.props.brand.fields.companyName}</h1>
        <div>
          {this.props.children}
          <Footer/>
        </div>
      </div>);
  }
}

const getInitialProps = async () => getInitialPropsData(APP_CONTAINER_PROPS_PATH);

const AppContainerWithInitialProps = withInitialProps(AppContainer, getInitialProps);
const AppContainerWithStylesAndInitialProps = withStyles(styles)(AppContainerWithInitialProps);

export default AppContainerWithStylesAndInitialProps;

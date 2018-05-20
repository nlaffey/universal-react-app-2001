import * as React from 'react';
import * as fetch from 'isomorphic-fetch';
import { Brand } from '../typings/contentful/Brand';
import Navigation from './Navigation';
import { Entry, EntryCollection } from 'contentful';
import Footer from './Footer';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { InitPropsContext } from '../router';
import { APP_CONTAINER_PROPS_PATH } from '../constants/pathNames';

const styles = require('./AppContainer.css');

export interface AppContainerInitialProps {
  brand: Entry<Brand>;
}

export interface AppContainerState {
  assetsUrl: string;
  brand: Entry<Brand>;
}

type AppContainerInitialPropsResponseObject = { id: string, json: AppContainerInitialProps };

class AppContainer extends React.Component<AppContainerInitialProps, AppContainerState> {

  static async getInitialProps(): Promise<AppContainerInitialPropsResponseObject> {
    const data = await fetch(`http://localhost:3000${APP_CONTAINER_PROPS_PATH}`, { cache: 'force-cache' });
    const json = await data.json();
    return {
      json,
      id: 'AppContainer'
    };
  }

  render() {
    return (
      <InitPropsContext.Consumer>
        {initProps => (
          <div className={styles.container}>
            <Navigation/>
            <h1>App container for {initProps.AppContainer.brand.fields.companyName}</h1>
            {this.props.children}
            <Footer/>
          </div>)
        }
      </InitPropsContext.Consumer>
    );
  }
}


const AppContainerWithStyles = withStyles(styles)(AppContainer);

export default AppContainerWithStyles;

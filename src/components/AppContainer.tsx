import * as React from 'react';
import { Brand } from '../typings/contentful/Brand';
import { Entry } from 'contentful';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { CONTENTFUL_ENTRY_ID_PATH, ENTRY_ID_PARAM } from '../constants/pathnames';
import { withInitialProps } from './WithInitialProps';
import { localApiFetch } from '../utils/environment';
import { contentIds } from '../contentful/typeIds';

const styles = require('./AppContainer.css');

export interface AppContainerInitialProps {
  brand: Entry<Brand>;
}

class AppContainer extends React.Component<AppContainerInitialProps> {

  render() {
    const { brand } = this.props;
    return (
      <div className={styles.container}>
        <h1>{brand.fields.siteName}</h1>
        {this.props.children}
      </div>);
  }
}

async function getInitialProps(port): Promise<AppContainerInitialProps> {
  const brandData = await localApiFetch(CONTENTFUL_ENTRY_ID_PATH.replace(ENTRY_ID_PARAM, contentIds.brand), port);
  const brand = await brandData.json();
  return { brand };
}

const AppContainerWithInitialProps = withInitialProps(AppContainer, 'AppContainer', getInitialProps);
const AppContainerWithStylesAndInitialProps = withStyles(styles)(AppContainerWithInitialProps);

export default AppContainerWithStylesAndInitialProps;

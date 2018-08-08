import * as React from 'react';
import { Brand } from '../typings/contentful/Brand';
import { Entry } from 'contentful';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { CONTENTFUL_ENTRY_ID_PATH, ENTRY_ID_PARAM } from '../constants/pathnames';
import { localApiFetch } from '../utils/environment';
import { contentIds } from '../contentful/typeIds';
import { InitialPropsContext } from '../utils/getInitialProps';
import withInitialProps from './withInitialProps';

const styles = require('./AppContainer.css');

export interface AppContainerInitialProps {
  brand: Entry<Brand>;
}

/**
 * AppContainer is an example of a wrapping container component that fetches data from an API proxied through our server
 */
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

async function getInitialProps(initialPropsContext: InitialPropsContext): Promise<AppContainerInitialProps> {
  const { port } = initialPropsContext;
  const brandData = await localApiFetch(CONTENTFUL_ENTRY_ID_PATH.replace(ENTRY_ID_PARAM, contentIds.brand), port);
  const brand = await brandData.json();
  return { brand };
}

// TODO: Type withInitialProps to make sure component matches getInitialsProps
const AppContainerWithInitialProps = withInitialProps<AppContainerInitialProps>(AppContainer, 'AppContainer', getInitialProps);
const AppContainerWithStylesAndInitialProps = withStyles(styles)(AppContainerWithInitialProps);

export default AppContainerWithStylesAndInitialProps;

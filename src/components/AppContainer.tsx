import * as React from 'react';
import * as fetch from 'isomorphic-fetch';
import { Brand } from '../typings/contentful/Brand';
import Navigation from './Navigation';
import { MenuCategory } from '../typings/contentful/MenuCategory';
import Menu from './Menu';
import { EntryCollection, Entry } from 'contentful';
import { Switch, Route } from 'react-router';
import Home from './Home';
import Footer from './Footer';

interface AppContainerProps {
  menuCategories: EntryCollection<MenuCategory>;
  brand: Entry<Brand>;
}

export class AppContainer extends React.Component<AppContainerProps, any> {

  static async getServerProps() {
    const data = await fetch('http://localhost:3000/data');
    return await data.json();
  }

  render() {
    const { menuCategories, brand } = this.props;
    const menuProps = { menuCategories };
    const homeProps = { brand };
    return (
      <div>
        <Navigation/>
        <Switch>
          <Route path="/" exact={true}>
            <Home {...homeProps}/>
          </Route>
          <Route path="/menu" exact={true}>
            <Menu {...menuProps}/>
          </Route>
        </Switch>
        <Footer brand={brand}/>
      </div>
    );
  }
}

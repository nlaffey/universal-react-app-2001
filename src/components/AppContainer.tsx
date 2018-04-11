import * as React from 'react';
import * as fetch from 'isomorphic-fetch';
import { Brand } from "../typings/contentful/Brand";
import Navigation from "./Navigation";
import Footer from "./Footer";
import { MenuCategory } from "../typings/contentful/MenuCategory";
import Menu from "./Menu";
import { EntryCollection, Entry } from "contentful";

interface AppContainerProps {
  menuCategories: EntryCollection<MenuCategory>
  brand: Entry<Brand>
}


export class AppContainer extends React.Component<AppContainerProps, any> {

  static async getServerProps() {
    const data = await fetch('http://localhost:3000/data');
    return await data.json();
  }

  render() {
    const { menuCategories, brand } = this.props;
    const menuProps = { menuCategories };

      return (<div>
      <Navigation/>
      {/*<img src={brand.fields.logo.fields.file.url}/>*/}
      <h1>{brand.fields.companyName}</h1>
      <p>{brand.fields.companyDescription}</p>
      <h1>Menu</h1>
      <Menu {...menuProps}/>
      <Footer brand={brand}/>
    </div>);
  }
}
import * as React from 'react';
import { EntryCollection } from 'contentful';
import { MenuCategory, MenuCategoryItemsEntity } from '../typings/contentful/MenuCategory';
import { MENU_PROPS_PATH } from '../constants/pathNames';
import { InitPropsContext } from '../router';


export interface MenuInitialPropsWrapper {
  id: string;
  json: MenuInitialProps;
}

export interface MenuInitialProps {
  menuCategories: EntryCollection<MenuCategory>;
}

export interface MenuProps {
  tester: boolean;
}

// noinspection JSUnusedGlobalSymbols
export default class extends React.Component<MenuProps> {

  static async getInitialProps(): Promise<MenuInitialPropsWrapper> {
    const data = await fetch(`http://localhost:3000${MENU_PROPS_PATH}`, { cache: 'force-cache' });
    const json = await data.json();
    return {
      json,
      id: 'Menu'
    };
  }

  renderItems(menuCategoryItems: (MenuCategoryItemsEntity)[] | any) {
    if (menuCategoryItems) {
      return menuCategoryItems.map((item: MenuCategoryItemsEntity) => {
        return (
          <li key={item.fields.slug}>
            <strong>{item.fields.productName}</strong>
            <br/>
            {item.fields.productDescription}
          </li>
        );
      });
    }
  }

  renderCategories(menuCategories: EntryCollection<MenuCategory>) {
    return menuCategories.items.map((menuCategory) => {
      const { title, menuCategoryItems } = menuCategory.fields;
      return (
        <div key={title}>
          <h2>{title}</h2>
          <ul>
            {this.renderItems(menuCategoryItems)}
          </ul>
        </div>);
    });
  }

  render() {
    return (
      <InitPropsContext.Consumer>
        {initProps => (
          <div>
            <h1>Menu</h1>
            {this.renderCategories(initProps.Menu.menuCategories)}
          </div>
        )}
      </InitPropsContext.Consumer>
    );
  }
}
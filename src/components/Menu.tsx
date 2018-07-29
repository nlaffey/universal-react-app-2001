import * as React from 'react';
import { EntryCollection } from 'contentful';
import { MenuCategory, MenuCategoryItemsEntity } from '../typings/contentful/MenuCategory';
import { MENU_PROPS_PATH } from '../constants/pathNames';
import { withInitialProps } from './WithInitialProps';

export interface MenuProps {
  menuCategories: EntryCollection<MenuCategory>;
}

class Menu extends React.Component<MenuProps> {

  static renderItems(menuCategoryItems: (MenuCategoryItemsEntity)[] | any) {
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

  renderCategories() {
    return this.props.menuCategories.items.map((menuCategory) => {
      const { title, menuCategoryItems } = menuCategory.fields;
      return (
        <div key={title}>
          <h2>{title}</h2>
          <ul>
            {Menu.renderItems(menuCategoryItems)}
          </ul>
        </div>);
    });
  }

  render() {
    return (
      <div>
        <h1>Menu</h1>
        {this.renderCategories()}
      </div>

    );
  }
}

const getInitialProps = async () => {
  const data = await fetch(`http://localhost:3000${MENU_PROPS_PATH}`, { cache: 'force-cache' });
  return data.json();
};

const menuWithInitialProps = withInitialProps(Menu, getInitialProps);

export default menuWithInitialProps;
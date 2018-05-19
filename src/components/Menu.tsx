import * as React from 'react';
import { EntryCollection } from 'contentful';
import { MenuCategory, MenuCategoryItemsEntity } from '../typings/contentful/MenuCategory';


interface MenuProps {
  menuCategories: EntryCollection<MenuCategory>;
}

// noinspection JSUnusedGlobalSymbols
export default class extends React.Component<MenuProps> {

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

  renderCategories() {
    return this.props.menuCategories.items.map((menuCategory) => {
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
      <div>
        <h1>The Menu</h1>
        {this.renderCategories()}
      </div>
    );
  }
}

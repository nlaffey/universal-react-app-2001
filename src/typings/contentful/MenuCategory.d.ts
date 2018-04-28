export interface MenuCategory {
  title: string;
  description: string;
  menuCategoryItems?: (MenuCategoryItemsEntity)[] | null;
}
export interface MenuCategoryItemsEntity {
  sys: Sys;
  fields: Fields;
}
export interface Sys {
  space: SpaceOrEnvironmentOrContentType;
  id: string;
  type: string;
  createdAt: string;
  updatedAt: string;
  environment: SpaceOrEnvironmentOrContentType;
  revision: number;
  contentType: SpaceOrEnvironmentOrContentType;
  locale: string;
}
export interface SpaceOrEnvironmentOrContentType {
  sys: Sys1;
}
export interface Sys1 {
  type: string;
  linkType: string;
  id: string;
}
export interface Fields {
  productName: string;
  slug: string;
  productDescription: string;
}

export interface MerchandiseCategory {
  title: string;
  description: string;
  menuCategoryItems?: (MenuCategoryItemsEntity)[] | null;
}
export interface MenuCategoryItemsEntity {
  sys: Sys;
  fields: Fields;
}
export interface Sys {
  space: SpaceOrContentType;
  id: string;
  type: string;
  createdAt: string;
  updatedAt: string;
  revision: number;
  contentType: SpaceOrContentType;
  locale: string;
}
export interface SpaceOrContentType {
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
  image?: (ImageEntity)[] | null;
  price: number;
}
export interface ImageEntity {
  sys: Sys2;
  fields: Fields1;
}
export interface Sys2 {
  space: SpaceOrContentType;
  id: string;
  type: string;
  createdAt: string;
  updatedAt: string;
  revision: number;
  locale: string;
}
export interface Fields1 {
  title: string;
  description: string;
  file: File;
}
export interface File {
  url: string;
  details: Details;
  fileName: string;
  contentType: string;
}
export interface Details {
  size: number;
  image: Image;
}
export interface Image {
  width: number;
  height: number;
}

export interface Brand {
  companyName: string;
  logo: Logo;
  companyDescription: string;
  website: string;
  twitter: string;
  email: string;
  phone?: (string)[] | null;
}
export interface Logo {
  sys: Sys;
  fields: Fields;
}
export interface Sys {
  space: Space;
  id: string;
  type: string;
  createdAt: string;
  updatedAt: string;
  revision: number;
  locale: string;
}
export interface Space {
  sys: Sys1;
}
export interface Sys1 {
  type: string;
  linkType: string;
  id: string;
}
export interface Fields {
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

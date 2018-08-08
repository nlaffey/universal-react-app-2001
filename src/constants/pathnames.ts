import * as path from 'path';

declare var global: {
  APP_ROOT_PATH: string,
};

export const ASSET_DOMAIN = '/';
export const BUNDLE_PATH = '/public/bundle.js';
export const FULL_BUNDLE_URL = path.join(ASSET_DOMAIN, BUNDLE_PATH);

export const PUBLIC_PATH = '/public';
export const FULL_PUBLIC_PATH = path.resolve(global.APP_ROOT_PATH, PUBLIC_PATH);

export const ROOT_PATH = '/';

export const ENTRY_ID_PARAM = ':entryId';
export const CONTENTFUL_ENTRY_ID_PATH = `/contentful/entry/${ENTRY_ID_PARAM}`;

export const BOOK_QUERY_PATH = '/books';
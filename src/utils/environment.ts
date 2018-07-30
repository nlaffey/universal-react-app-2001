import * as fetch from 'isomorphic-fetch';

export function getApiUrl() {
  let url = `http://localhost:${getPort()}`;
  if (typeof window !== 'undefined') {
    const { protocol, host } = window.location;
    url = `${protocol}//${host}`;
  }
  return url;
}

export function getPort() {
  let port = '3000';
  if (process && process.env && process.env.PORT) {
    port = process.env.PORT;
  }
  return port;
}

export function getInitialPropsUrl(pathName: string) {
  return `${getApiUrl()}/${pathName}`;
}

/**
 * TODO: Think of better names for these functions. Having getInitialProps wrap
 * getInitialPropsData feels too similar
 */
export async function getInitialPropsData(pathName: string) {
  const url = getInitialPropsUrl(pathName);
  const data = await fetch(url, { cache: 'force-cache' });
  return data.json();
}

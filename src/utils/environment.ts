import * as fetch from 'isomorphic-fetch';

export function getLocalApiRootUrl(port) {
  let url = `http://localhost:${port}`;
  if (typeof window !== 'undefined') {
    const { protocol, host } = window.location;
    url = `${protocol}//${host}`;
  }
  return url;
}

export function getLocalApiUrl(path: string, port) {
  return `${getLocalApiRootUrl(port)}${path}`;
}

export async function localApiFetch(pathname: string, port): Promise<Response> {
  const url = getLocalApiUrl(pathname, port);
  return fetch(url, { cache: 'force-cache' });
}

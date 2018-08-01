import * as fetch from 'isomorphic-fetch';

export function getApiUrl(port) {
  let url = `http://localhost:${port}`;
  if (typeof window !== 'undefined') {
    const { protocol, host } = window.location;
    url = `${protocol}//${host}`;
  }
  return url;
}

export function getInitialPropsUrl(pathName: string, port) {
  return `${getApiUrl(port)}/${pathName}`;
}

/**
 * TODO: Think of better names for these functions. Having getInitialProps wrap
 * getInitialPropsData feels too similar
 */
export async function getInitialPropsData(pathName: string, port) {
  const url = getInitialPropsUrl(pathName, port);
  console.log(`getInitialPropsUrl()${url}`);
  const data = await fetch(url, { cache: 'force-cache' });
  console.log(JSON.stringify(data));
  return data.json();
}

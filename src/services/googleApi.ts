import * as fetch from 'isomorphic-fetch';
import { BookQueryResponseJson } from '../typings/googleApi/book';

export async function getBookListingByQuery(query: string): Promise<BookQueryResponseJson> {
  const responsePromise: Response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
  return responsePromise.json();
}

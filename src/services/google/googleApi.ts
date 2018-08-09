import * as fetch from 'isomorphic-fetch';
import { BookQueryResponseJson } from '../../typings/googleApi/book';

export async function getBookListingByQuery(query: string, startIndex: number = 0): Promise<BookQueryResponseJson> {
  const responsePromise: Response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}&startIndex=${startIndex}`);
  return responsePromise.json();
}

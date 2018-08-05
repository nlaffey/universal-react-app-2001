import * as React from 'react';
import * as queryString from 'query-string';
import { getBookListingByQuery } from '../services/googleApi';
import { InitialPropsContext } from '../getInitialProps';
import withInitialProps from './withInitialProps';

const DEFAULT_QUERY = '2001: A Space Odyssey';

interface BookQueryPageInitialProps {
  initialBookQueryResponse: any;
  initialQuery: string;
}

interface BookQueryPageProps extends BookQueryPageInitialProps {
}

interface BookQueryPageState {
  bookQueryResponse: any;
  query: string;
}

/**
 * Book initialQuery page is an example of a page that uses an external API to get its initial props
 */
class BookQueryPage extends React.Component<BookQueryPageProps, BookQueryPageState> {

  constructor(props) {
    super(props);
    this.handleQueryChange = this.handleQueryChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.state = {
      query: props.initialQuery || DEFAULT_QUERY,
      bookQueryResponse: null
    };
  }

  async handleFormSubmit(event) {
    event.preventDefault();
    const { query } = this.state;
    const bookQueryResponse = await getBookListingByQuery(query);
    // Update the query param in the URL without reloading the page.
    // TODO: Might be a better way of handling this through the universal router.
    window.history.pushState({}, document.title, `${window.location.pathname}?query=${query}`);
    this.setState({ bookQueryResponse });
  }

  handleQueryChange(event) {
    this.setState({ query: event.target.value });
  }

  getQuery() {
    return this.props.initialQuery || this.state.query;
  }

  getBookQueryResponse() {
    return this.state.bookQueryResponse || this.props.initialBookQueryResponse;
  }

  renderBooks() {
    const bookQueryResponse = this.getBookQueryResponse();
    const { items } = bookQueryResponse;
    if (!items) return;
    return items.map((book) => {
      const { volumeInfo, id, saleInfo } = book;
      const { title, description } = volumeInfo;
      const { buyLink } = saleInfo;
      return (
        <div key={id}>
          <h2><a href={buyLink}>{title}</a></h2>
          <p>{description}</p>
        </div>);
    });
  }

  render() {
    const bookQueryResponse = this.getBookQueryResponse();
    const { query } = this.state;
    const { totalItems } = bookQueryResponse;
    return (
      <div>
        <h1>Books</h1>
        <h2>Showing first 10 results of {totalItems}</h2>
        <form onSubmit={this.handleFormSubmit}>
          <input type="text" value={query} name="query" onChange={this.handleQueryChange}/>
          <button type="submit">Search</button>
        </form>
        {this.renderBooks()}
      </div>
    );
  }
}

async function getInitialProps(initialPropsContext: InitialPropsContext): Promise<BookQueryPageInitialProps> {
  const { resolveObject } = initialPropsContext;
  const { query } = resolveObject;
  // TODO: Think about naming here, it's not that awesome that im getting the query from the query (location.search)
  const initialQuery = queryString.parse(query).query || DEFAULT_QUERY;
  const initialBookQueryResponse = await getBookListingByQuery(initialQuery);
  return { initialBookQueryResponse, initialQuery };
}

// TODO: Try to remove the need for initialPropsId to be passed in
const BookQueryPageWithInitialProps = withInitialProps<BookQueryPageInitialProps>(BookQueryPage, 'BookQueryPage', getInitialProps);

export default BookQueryPageWithInitialProps;

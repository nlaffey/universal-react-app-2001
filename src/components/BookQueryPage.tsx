import * as React from 'react';
import { withInitialProps } from './WithInitialProps';
import { getBookListingByQuery } from '../services/googleApi';
import { BookQueryResponseJson } from '../typings/googleApi/book';

const DEFAULT_QUERY = '2001';

interface BookQueryPageInitialProps {
  bookQueryResponse: BookQueryResponseJson;
}

interface BookQueryPageProps extends BookQueryPageInitialProps {
}

interface Page1State {
  bookQueryResponse: BookQueryResponseJson;
  query: string;
}

class BookQueryPage extends React.Component<BookQueryPageProps, Page1State> {

  constructor(props) {
    super(props);
    this.handleQueryChange = this.handleQueryChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.state = {
      query: DEFAULT_QUERY,
      bookQueryResponse: null
    };
  }

  async handleFormSubmit(event) {
    event.preventDefault();
    const bookQueryResponse = await getBookListingByQuery(this.state.query);
    this.setState({ bookQueryResponse });
  }

  handleQueryChange(event) {
    this.setState({ query: event.target.value });
  }

  getBookQueryResponse() {
    return this.state.bookQueryResponse || this.props.bookQueryResponse;
  }

  renderBooks() {
    const bookQueryResponse = this.getBookQueryResponse();
    const { items } = bookQueryResponse;
    return items.map((book) => {
      const { volumeInfo, id, saleInfo } = book;
      const { title, description } = volumeInfo;
      const { buyLink } = saleInfo;
      return (<div key={id}>
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
        <h1>Books found: {totalItems}</h1>
        <form onSubmit={this.handleFormSubmit}>
          <input type="text" value={query} onChange={this.handleQueryChange}/>
          <button type="submit">Search</button>
        </form>
        {this.renderBooks()}
      </div>
    );
  }
}

async function getInitialProps(port): Promise<BookQueryPageInitialProps> {
  const bookQueryResponse = await getBookListingByQuery(DEFAULT_QUERY);
  return { bookQueryResponse };
}

// TODO: Try to remove the need for initialPropsId to be passed in
const BookQueryPageWithInitialProps = withInitialProps(BookQueryPage, 'BookQueryPage', getInitialProps);

export default BookQueryPageWithInitialProps;

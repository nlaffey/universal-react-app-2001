import * as React from 'react';
import { BOOK_QUERY_PATH, ROOT_PATH } from '../constants/pathnames';
import appHistory from '../appHistory';

interface NavigationProps {
}

class Navigation extends React.Component<NavigationProps> {
  constructor(props) {
    super(props);
    Navigation.handleNavigationClick = Navigation.handleNavigationClick.bind(this);
  }

  static handleNavigationClick(pathname: string, event): void {
    event.preventDefault();
    appHistory.push(pathname);
  }

  render() {
    // TODO: Create Link components so that were not passing in anonymous functions in the onclick
    const rootLinkProps = {
      href: ROOT_PATH,
      onClick: (event) => {
        Navigation.handleNavigationClick(ROOT_PATH, event);
      }
    };
    const page1LinkProps = {
      href: BOOK_QUERY_PATH,
      onClick: (event) => {
        Navigation.handleNavigationClick(BOOK_QUERY_PATH, event);
      }
    };
    return (
      <div>
        <h5>Navigation</h5>
        <ul>
          <li>
            <a {...rootLinkProps}>Root</a>
          </li>
          <li>
            <a {...page1LinkProps}>Books</a>
          </li>
        </ul>
      </div>
    );
  }
}

export default Navigation;

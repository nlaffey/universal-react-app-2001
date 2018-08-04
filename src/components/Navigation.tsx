import * as React from 'react';
import { PAGE1_PATH, ROOT_PATH } from '../constants/pathnames';

interface NavigationProps {
}

class Navigation extends React.Component<NavigationProps> {

  render() {
    return (
      <div>
        <h5>Navigation</h5>
        <ul>
          <li><a href={ROOT_PATH}>Root</a></li>
          <li><a href={PAGE1_PATH}>Page1</a></li>
        </ul>
      </div>
    );
  }
}

export default Navigation;

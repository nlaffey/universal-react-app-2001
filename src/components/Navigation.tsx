import * as React from 'react';
import { Link } from 'react-router-dom';


interface NavigationProps {
}

export default class extends React.Component<NavigationProps> {

  render() {
    return (
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/menu">Menu</Link></li>
      </ul>
    );
  }
}

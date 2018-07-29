import * as React from 'react';
import history from '../history';

interface NavigationProps {
}

class Navigation extends React.Component<NavigationProps> {

  render() {
    return (
      <div>
        <h5>Navigation</h5>
        <button onClick={() => history.push('/')}>Home</button>
        <button onClick={() => history.push('/menu')}>Menu</button>
      </div>
    );
  }
}

export default Navigation;

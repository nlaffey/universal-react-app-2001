import * as React from 'react';
import history from '../history';

interface NavigationProps {
}

class Navigation extends React.Component<NavigationProps> {

  render() {
    return (
      <div>
        <button onClick={() => history.push('/menu')}>Menu</button>
        <button onClick={() => history.push('/')}>Home</button>
      </div>
    );
  }
}

export default Navigation;

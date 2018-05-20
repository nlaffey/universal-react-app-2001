import * as React from 'react';
import history from '../history';

interface NavigationProps {
}

class Navigation extends React.Component<NavigationProps> {

  static async getInitialProps(): Promise<NavigationProps> {
    const data = await fetch('http://www.example.com');
    return await data.json();
  }

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

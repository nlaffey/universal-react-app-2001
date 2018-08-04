import * as React from 'react';

interface HomeProps {
}

class HomeComponent extends React.Component<HomeProps> {

  render() {
    return (
      <div>
        <h1>HomeComponent, I dont have any initial props</h1>
      </div>
    );
  }
}

export default HomeComponent;

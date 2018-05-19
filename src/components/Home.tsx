import * as React from 'react';

interface HomeProps {
}

class HomeComponent extends React.Component<HomeProps> {

  render() {
    return (
      <div>
        <h1>HomeComponent</h1>
        {JSON.stringify(this.context)}
      </div>
    );
  }
}

export default HomeComponent;

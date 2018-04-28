import * as React from 'react';
import { Brand } from '../typings/contentful/Brand';
import { Entry } from 'contentful';

interface HomeProps {
  brand: Entry<Brand>;
}

export default class extends React.Component<HomeProps> {

  render() {
    return (
      <div>
        <h1>Taco cat!!!!</h1>
        <div>{JSON.stringify(this.props.brand)}</div>
      </div>
    );
  }
}

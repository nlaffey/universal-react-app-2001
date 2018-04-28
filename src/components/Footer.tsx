import * as React from 'react';
import { Entry } from 'contentful';
import { Brand } from '../typings/contentful/Brand';


interface FooterProps {
  brand: Entry<Brand>;
}

export default class extends React.Component<FooterProps> {
  render() {
    const { email, phone, twitter } = this.props.brand.fields;
    return (
      <ul>
        <li><a href={twitter}>twitter: {twitter}</a></li>
        <li><a href={'tel:' + phone}>tel:{phone}</a></li>
        <li><a href={'mailto:' + email}>email:{email}</a></li>
      </ul>
    );
  }
}

import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { AppContainer } from './components/AppContainer';
import { BrowserRouter } from 'react-router-dom';

declare var window: { initialProps };
const mountingPoint = document.getElementById('root');
const props = window.initialProps;

ReactDOM.hydrate(
  <BrowserRouter>
    <AppContainer {...props}/>
  </BrowserRouter>,
  mountingPoint);



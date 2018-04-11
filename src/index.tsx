import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { AppContainer } from './components/AppContainer';

declare var window: { initialProps };
const mountingPoint = document.getElementById('root');
const props = window.initialProps;

ReactDOM.hydrate(<AppContainer {...props}/>, mountingPoint);



import React from 'react';
import ReactDOM from 'react-dom';
import Main from './components/main';

const rootElement = document.getElementById('root');

if (rootElement) {
    ReactDOM.render(<Main/>, rootElement);
}

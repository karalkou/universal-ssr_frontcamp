import React from 'react';
import ReactDOM from 'react-dom';
import 'typeface-open-sans/index.css';
import registerServiceWorker from './registerServiceWorker';
import Root from './components/Root';

ReactDOM.hydrate(
    <Root />,
    document.getElementById('root'),
);
registerServiceWorker();

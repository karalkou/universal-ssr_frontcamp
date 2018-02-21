import React from 'react';
import ReactDOM from 'react-dom';
import 'typeface-open-sans';
import registerServiceWorker from './registerServiceWorker';
import Root from './components/Root';

ReactDOM.render(
    <Root />,
    document.getElementById('root')
);
registerServiceWorker();

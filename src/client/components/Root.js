import React, { Component } from 'react';
import { Provider } from 'react-redux';
import configureStore from '../redux';
import App from './App';
import { ConnectedRouter as Router } from 'react-router-redux';
import history from '../history';

// Grab the state from a global variable injected into the server-generated HTML
const store = configureStore(window.PRELOADED_STATE);
// Allow the passed state to be garbage-collected
delete window.PRELOADED_STATE;

class Root extends Component {
    static propTypes = {};

    render() {
        return (
            <Provider store={store}>
                <Router history={history}>
                    <App/>
                </Router>
            </Provider>
        )
    }
}

export default Root

import React, { Component } from 'react';
import { Provider } from 'react-redux';
import configureStore from '../redux';
import App from './App';
import { ConnectedRouter as Router } from 'react-router-redux';
import history from '../history';

const store = configureStore({});

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

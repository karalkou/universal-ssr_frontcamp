import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter as Router } from 'react-router-redux';
import configureStore from '../redux';
import App from './App';
import history from '../history';
import { arrayToMap } from '../utils';
import { ArticleModel, ReducerRecord as ReduceRecordArticles } from '../ducks/articles';
import { ReducerRecord as ReduceRecordFilters } from '../ducks/filters';

// Grab the state from a global variable injected into the server-generated HTML
const preloadedState = window.PRELOADED_STATE;

// const { articles, filters } = preloadedState;
const articlesRevived = new ReduceRecordArticles().set('entities', arrayToMap([], ArticleModel));
const filtersRevived = new ReduceRecordFilters();

const preloadedStatePost = {
    ...preloadedState,
    articles: articlesRevived,
    filters: filtersRevived,
};

const store = configureStore(preloadedStatePost);
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
        );
    }
}

export default Root;

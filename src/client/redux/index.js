import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import reducer from './reducer';
import history from '../history';
import saga from './saga';

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers =
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
            // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
        }) : compose;

const enhancer = composeEnhancers(
    applyMiddleware(routerMiddleware(history), sagaMiddleware, logger)
);

const store = createStore(reducer, enhancer);

sagaMiddleware.run(saga);

window.store = store;

export default store;
import { createStore, applyMiddleware, compose } from 'redux';
import logger from 'redux-logger';
import createSagaMiddleware, { END } from 'redux-saga';
import reducer from './reducer';
import saga from './saga';

export const sagaMiddleware = createSagaMiddleware();

const composeEnhancers =
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
            // Specify extension’s options like name,
            // actionsBlacklist, actionsCreators, serialize...
        }) : compose;

const currentAppMiddlewares = [];

currentAppMiddlewares.push(sagaMiddleware);

if (typeof window !== 'undefined') {
    currentAppMiddlewares.push(logger);
}

const enhancer = composeEnhancers(applyMiddleware(...currentAppMiddlewares));

export default (initialState) => {
    const store = createStore(reducer, initialState, enhancer);

    store.runSaga = sagaMiddleware.run;
    store.close = () => store.dispatch(END);
    sagaMiddleware.run(saga);

    return store;
};


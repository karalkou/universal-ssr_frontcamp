import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import configureStore from '../client/redux';
import App from '../client/components/App';

import saga from './../client/redux/saga';

function handleRender(req, res) {
    const store = configureStore({});

    const context = {};
    const app = (
        <Provider store={store}>
            <StaticRouter location={req.url} context={context}>
                <App />
            </StaticRouter>
        </Provider>
    );

    store.runSaga(saga).done.then(() => {
        const html = renderToString(app);

        if (context.url) {
            // Somewhere a `<Redirect>` was rendered
            return res.redirect(context.url);
        }

        // Grab the initial state from our Redux store
        const preloadedStatePre = store.getState();

        const { articles, filters } = preloadedStatePre;

        const preloadedState = {
            ...preloadedStatePre,
            articles: articles.toJS(),
            filters: filters.toJS(),
        };

        return res.render('layout', {
            html,
            preloadedState: JSON.stringify(preloadedState).replace(/</g, '\\\\\u003c'),
        });
    });

    // Do first render, starts initial actions.
    renderToString(app);

    // When the first render is finished, send the END action to redux-saga.
    store.close();
}

export default handleRender;

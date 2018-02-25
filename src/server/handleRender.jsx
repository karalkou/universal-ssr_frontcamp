import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import configureStore from '../client/redux';
import App from '../client/components/App';

import saga from './../client/redux/saga';

function renderFullPage(html, preloadedState) {
    return `
      <!doctype html>
      <html>
        <head>
          <meta charset=utf-8>
          <title>React Server Side Rendering</title>
          <style>
            html, body { height: 100%; margin: 0; padding: 0; }
            #root { height: 100%; box-sizing: border-box; font-family: 'Open Sans', 'Arial', sans-serif; background-color: #e6ecf0; }
          </style>
        </head>
        <body>
          <div id="root">${html}</div>
          <script>
            // WARNING: See the following for security issues around embedding JSON in HTML:
            // http://redux.js.org/docs/recipes/ServerRendering.html#security-considerations
            window.PRELOADED_STATE = ${JSON.stringify(preloadedState).replace(/</g, '\\\u003c')}
          </script>
          <script src="/js/bundle.js"></script>
        </body>
      </html>
  `;
}

function handleRender(req, res) {
    const store = configureStore({});

    const context = {};
    const app = (
        <Provider store={store}>
            <StaticRouter location={req.url} context={context} >
                <App name="World" />
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
        const preloadedState = store.getState();

        return res.send(renderFullPage(html, preloadedState));
    });

    // Do first render, starts initial actions.
    renderToString(app);

    // When the first render is finished, send the END action to redux-saga.
    store.close();
}

export default handleRender;

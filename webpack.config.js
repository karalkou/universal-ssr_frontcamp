const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
// const devserver = require('./webpack/devserver');
const styles = require('./webpack/styles');
const jsConfig = require('./webpack/js');
const html = require('./webpack/html');
const pug = require('./webpack/pug');
const devserver = require('./webpack/devserver');
const images = require('./webpack/images');
const fonts = require('./webpack/fonts');

const PATHS = {
    templates: path.join(__dirname, 'src/templates'),
};

const common = merge([
    {
        entry: ['babel-polyfill', './src/client/index.js'],

        output: {
            filename: 'bundle.js',
            path: path.resolve('./public/js/'),
        },

        resolve: {
            extensions: ['.js', '.jsx'],
        },

        plugins: [],
    },

    jsConfig(),
    images(),
    fonts(),
]);

module.exports = function returnConfig(env) {
    if (env === 'production') {
        return merge([
            /* { mode: 'production' }, */
            /* {
                optimization: {
                    minimize: true,
                },
            }, */
            common,
            styles(),
        ]);
    }

    if (env === 'development') {
        return merge([
            /* { mode: 'development' }, */
            common,
            html(PATHS.templates),
            pug(),
            devserver(),
            styles(),
        ]);
    }

    return undefined;
};

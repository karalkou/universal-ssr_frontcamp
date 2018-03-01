const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
// const devserver = require('./webpack/devserver');
const styles = require('./webpack/styles');
const jsConfig = require('./webpack/js');
const uglifyJS = require('./webpack/js.uglify');
const images = require('./webpack/images');
const fonts = require('./webpack/fonts');

/* const PATHS = {
    source: path.join(__dirname, 'source'),
    build: path.join(__dirname, 'build'),
}; */

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
            { mode: 'production' },
            common,
            uglifyJS(),
        ]);
    }

    if (env === 'development') {
        return merge([
            { mode: 'development' },
            common,
            // devserver(),
            styles(),
        ]);
    }

    return undefined;
};

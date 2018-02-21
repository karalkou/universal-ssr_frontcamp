const path = require('path');

module.exports = {
  entry: ['babel-polyfill', './src/client/index.js'],

  output: {
    filename: 'bundle.js',
    path: path.resolve('./public/js/'),
  },

  resolve: {
    extensions: ['.js', '.jsx'],
  },

  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: [/node_modules/],
        use: 'babel-loader',
      },
      {
        test: /\.(css|less|styl|scss|sass|sss)$/,
        rules: [
          {
            use: 'style-loader',
          },

          // Process external/third-party styles
          {
            exclude: path.resolve(__dirname, '../../src'),
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              sourceMap: true,
              minimize: false,
            },
          },

          // Process internal/project styles (from src folder)
          {
            include: path.resolve(__dirname, '../../src'),
            loader: 'css-loader',
            options: {
              // CSS Loader https://github.com/webpack/css-loader
              importLoaders: 1,
              sourceMap: true,
              // CSS Modules https://github.com/css-modules/css-modules
              modules: true,
              localIdentName: '[name]-[local]-[hash:base64:5]',
              // CSS Nano http://cssnano.co/
              minimize: false,
            },
          },

          // To use autoprefixer
          /*{
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
            },
          },*/

          // Compile Sass to CSS
          // https://github.com/webpack-contrib/sass-loader
          // Install dependencies before uncommenting: yarn add --dev sass-loader node-sass
          /*{
            test: /\.(scss|sass)$/,
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },*/
        ],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file-loader',
      }
    ],
  },
};

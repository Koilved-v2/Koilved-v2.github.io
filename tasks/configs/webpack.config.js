const path = require('path');
const webpack = require('webpack-stream').webpack;
const config = require('./main.config');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

console.log('-----=------');
console.log(process.env.NODE_ENV);
console.log('-----=------');
console.log('');

const isDevelopment =  !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

const pluginsProd = [

  new UglifyJSPlugin({
    sourceMap: false
  }),

  new webpack.optimize.OccurrenceOrderPlugin(true)
];

const pluginsDev = [
  new webpack.NoEmitOnErrorsPlugin()
];

const plugins = isDevelopment ? pluginsDev : pluginsProd;

module.exports = {
  watch: isDevelopment,

  mode: isDevelopment ? 'development' : 'production',

  entry: config.paths.entry,

  devtool: isDevelopment ? 'eval' : 'hidden-source-map', // settings source-map

  output: {
    publicPath: '/js/',
    path: '/public/js/',
    filename: 'bundle.js'
    // filename: 'bundle.[chunkhash].js',
    // publicPath: '/public/js/',
    // filename: 'bundle.js',
  },

  plugins: [
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      API: JSON.stringify(process.env.API)
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    }),

    // new HtmlWebpackPlugin({
    //     title: 'Custom template',
    //     template: 'about.html',
    //     filename: 'about.html',
    //     chunks: ['about'],
    // }),
    // new webpack.optimize.CommonsChunkPlugin({
    //     name: 'commons',
    //     filename: 'commons.js',
    //     minChunks: 2,
    // }),
    ...plugins
  ],
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules\/(?!(dom7|swiper)\/).*/,
      use: [
        {
          loader: 'babel-loader',
          options: {presets: ['es2015', 'stage-0']}
        }
      ]
    },
    {
      test: /\.css$/i,
      loader: 'css-loader',
      options: {
        import: true
      }
    },
    {
      test: /\.scss$/i,
      use: [
        {
          loader: 'sass-loader',
          options: {
            sassOptions: {
              includePaths: [path.resolve(__dirname, 'node_modules'), path.resolve(__dirname, 'src')]
            }
          }
        }
      ]
    }]
  }
};


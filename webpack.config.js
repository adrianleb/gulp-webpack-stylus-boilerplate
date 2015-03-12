var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {

  entry:{
      app:['webpack/hot/only-dev-server', 'webpack-dev-server/client?http://localhost:9191', './src/assets/js/app.js'],
      pages:['webpack/hot/only-dev-server', 'webpack-dev-server/client?http://localhost:9191', './src/assets/js/pages.js'],
      },
  output: {
      path: __dirname + "/assets/",
      publicPath: "/assets/",
      filename: "[name]-bundle.js"
  },
  resolve: {
    extensions: ['', '.js', '.styl']
  },
  plugins: [
      // new ExtractTextPlugin("[name]-bundle.css"),
      new webpack.NoErrorsPlugin(),
      new webpack.HotModuleReplacementPlugin()
  ],
  module: {
      loaders: [
          { test: /\.js$/, loaders: ['react-hot','jsx?harmony'], exclude: /node_modules/ },
          { test: /\.styl$/, loader: 'style-loader!css-loader!stylus-loader'},
          // { test: /\.styl$/, loader: ExtractTextPlugin.extract('style-loader','css-loader!stylus-loader')},
          { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'}, // inline base64 URLs for <=8k images, direct URLs for the rest
          { test: /\.woff$/, loader: "url-loader?limit=10000&mimetype=application/font-woff" },
          { test: /\.ttf$/,  loader: "url-loader?limit=10000&mimetype=application/octet-stream" },
          { test: /\.eot$/,  loader: "file-loader" },
          { test: /\.svg$/,  loader: "url-loader?limit=10000&mimetype=image/svg+xml" }
          // {test: /\.(jpe?g|png|gif|svg)$/i, loaders: ['image?optimizationLevel=7&interlaced=false']}
      ]
  } 

};

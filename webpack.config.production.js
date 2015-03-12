var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var path = require("path");
module.exports = {
    outputDir: "./public/assets",
    entry: {
        app: "./resources/assets/js/app.js",
        pages: "./resources/assets/js/pages.js"
    },
    output: {
      path: path.join(__dirname, "public/assets"),
      publicPath: "./public/assets/",

      filename: "[name]-bundle.js"        
    },
    resolve: {
        extensions: ['', '.js', '.styl']
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env": {
                // This has effect on the react lib size
                "NODE_ENV": JSON.stringify("production")
            }
        }),
        new ExtractTextPlugin("[name]-bundle.css"),

        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin()
    ],
    module: {
        loaders: [
          { test: /\.js$/, loaders: ['jsx?harmony'], exclude: /node_modules/ },
          { test: /\.styl$/, loader: ExtractTextPlugin.extract('style-loader','css-loader!stylus-loader')},
          { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'}, // inline base64 URLs for <=8k images, direct URLs for the rest
          { test: /\.woff$/, loader: "url-loader?limit=10000&mimetype=application/font-woff" },
          { test: /\.ttf$/,  loader: "url-loader?limit=10000&mimetype=application/octet-stream" },
          { test: /\.eot$/,  loader: "file-loader" },
          { test: /\.svg$/,  loader: "url-loader?limit=10000&mimetype=image/svg+xml" }
        ]
    }
};

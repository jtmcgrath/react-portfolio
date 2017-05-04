const path = require("path");
const webpack = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

let config = {
  entry: ["babel-polyfill", "./app/root.scss", "./app/root.jsx"],
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "portfolio.js",
    publicPath: "/"
  },
  resolve: {
    alias: {
      "js": path.resolve(__dirname, "app/js"),
      "css": path.resolve(__dirname, "app/css"),
      "components": path.resolve(__dirname, "app/components")
    },
    extensions: [".js", ".jsx"]
  },
  module: {
    rules: [
      {test: /\.(js|jsx)$/, loader: "babel-loader"},
      {test: /\.scss$/, loader: ExtractTextPlugin.extract(["css-loader", "sass-loader"])},
      {test: /\.(jpg|gif|png)$/, loader: "file-loader", options: {name: "./images/[name].[ext]"}},
    ]
  },
  devServer: {
    historyApiFallback: true
  },
  plugins: [
    new CopyWebpackPlugin([
      {from: "app/static"},
      {from: "app/images", to: "images"}
    ], {
      ignore: ["*.db"]
    }),
    new HtmlWebpackPlugin({
      template: "./app/index.html"
    }),
    new webpack.LoaderOptionsPlugin({
      options: {
        sassLoader: {
          includePaths: ["app/css"]
        }
      }
    }),
    new ExtractTextPlugin({
      filename: "style.[hash].css",
      allChunks: true
    })
  ]
};

if (process.env.NODE_ENV === "production") {
  config.plugins.push(
    new webpack.DefinePlugin({
      "process.env": {
        "NODE_ENV": JSON.stringify(process.env.NODE_ENV)
      }
    }),
    new webpack.optimize.UglifyJsPlugin()
  );
}

module.exports = config;

const path = require("path")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const {CleanWebpackPlugin} = require("clean-webpack-plugin")
const HTMLWebpackPlugin = require("html-webpack-plugin")

const isDev = process.env.NODE_ENV === 'development'

module.exports = {
  context: path.resolve(__dirname, "src"),
  mode: process.env.NODE_ENV,
  entry: "./scripts/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    assetModuleFilename: "assets/images/[name][ext]"
  },
  devServer: {
    port: 4000,
    hot: isDev,
    watchFiles: [
      'src/index.html',
      'src/bookList.html',
      'src/editBook.html',
      'src/register.html',
      'src/bookInfo.html'
    ]
  },
  target: isDev ? "web" : "browserslist",
  resolve: {
    extensions: ['.js', '.json', '.png', '.jpg', '.css', '.svg'],
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: "./bookInfo.html",
      filename: 'bookInfo.html',
    }),
    new HTMLWebpackPlugin({
      template: "./bookList.html",
      filename: 'bookList.html',
    }),
    new HTMLWebpackPlugin({
      template: "./index.html",
      filename: 'index.html',
    }),
    new HTMLWebpackPlugin({
      template: "./addBook.html",
      filename: 'addBook.html',
    }),
    new HTMLWebpackPlugin({
      template: "./editBook.html",
      filename: 'editBook.html',
    }),
    new HTMLWebpackPlugin({
      template: "./register.html",
      filename: 'register.html',
    }),
    new MiniCssExtractPlugin({
      filename: "style.css",
    }),
    new CleanWebpackPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          isDev ? "style-loader" : MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
      }
    ]
  },
}
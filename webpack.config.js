const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    main: ['./src/index.tsx'],
  },
  output: {
    publicPath: '/',
    path: path.resolve(__dirname, 'build'),
    filename: 'js/[name]-bundle-[contenthash:6].js',
    chunkFilename: 'js/[name]-bundle-[contenthash:6].js',
    assetModuleFilename: 'assets/[contenthash:6][ext][query]',
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'build'),
    port: 9000,
    historyApiFallback: true,
    open: true,
    overlay: true,
  },
  module: {
    rules: [
      { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader' },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'ts-loader'],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        type: 'asset',
        generator: {
          filename: 'assets/images/[name]-[contenthash:4][ext]',
        },
      },
      {
        test: /\.(eot|ttf|woff2?)$/i,
        type: 'asset',
        generator: {
          filename: 'assets/fonts/[name]-[contenthash:4][ext]',
        },
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.svg$/,
        use: [
          '@svgr/webpack',
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: 'assets/images/svg/[name]-[contenthash:4].[ext]',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({ title: 'App', template: './public/index.html', filename: 'index.html' }),
    new MiniCssExtractPlugin({
      filename: 'assets/css/[name]-[contenthash:8].css',
      chunkFilename: '[id].css',
    }),
    // new CopyWebpackPlugin({ patterns: [{ from: 'public', to: '' }] }),
  ],
};

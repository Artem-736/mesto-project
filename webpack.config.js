const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = (env, argv) => ({
  entry: './src/pages/index.js', // Входной JS файл
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js', // Собранный JS
    clean: true, // Очищать dist перед сборкой
  },
  mode: argv.mode || 'development',
  devtool: argv.mode === 'production' ? false : 'source-map',
  devServer: {
    static: './dist',
    open: true,
    hot: true,
  },
  module: {
    rules: [
      // Babel для JS
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      // CSS
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
      },
      // Картинки
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset/resource',
      },
      // Шрифты
      {
        test: /\.(woff2?|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
      // HTML (если нужны инклюды и т.д.)
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      minify: argv.mode === 'production' ? {
        collapseWhitespace: true,
        removeComments: true,
      } : false,
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
    }),
  ],
  optimization: {
    minimize: argv.mode === 'production',
    minimizer: [
      `...`, // Использует стандартный TerserPlugin
      new CssMinimizerPlugin(),
    ],
  },
});

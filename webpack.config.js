const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    "angular-pica": "./src/angular-pica.module.ts",
    "angular-pica.min": "./src/angular-pica.module.ts",
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: "[name].js"
  },
  resolve: {
    extensions: [".ts", ".js"]
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          {
            loader: "ng-annotate-loader"
          },
          {
            loader: "ts-loader"
          }
        ],
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      include: /\.min\.js$/,
      minimize: true
    })
  ],
  externals: {
    angular: 'angular',
    pica: 'pica'
  }
};
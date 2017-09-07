// https://www.typescriptlang.org/docs/handbook/react-&-webpack.html

module.exports = {
  entry: './src/app/index.tsx',
  output: {
    filename: 'bundle.js',
    path: __dirname + '/dist',
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader',
      },
      {
        test: /\.js$/,
        loader: 'source-map-loader',
        enforce: 'pre',
      },
      {
        test: /\.scss$/,
        loaders: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
      },
    ],
  },
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM',
  },
};

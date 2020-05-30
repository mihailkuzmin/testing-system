const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    app: './src/client/index.tsx',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/client/index.html'),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              configFile: path.resolve(__dirname, 'src/client/tsconfig.json'),
              context: path.resolve(__dirname, 'src'),
            },
          },
          // { loader: 'eslint-loader' },
        ],
        exclude: /node_modules|server/,
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      '@common': path.resolve(__dirname, './src/common'),
      '@components': path.resolve(__dirname, './src/client/components'),
      '@api': path.resolve(__dirname, './src/client/api'),
      '@model': path.resolve(__dirname, './src/client/model'),
      '@pages': path.resolve(__dirname, './src/client/pages'),
      '@routes': path.resolve(__dirname, './src/client/routes'),
      '@typings': path.resolve(__dirname, './src/client/typings'),
    },
  },
  output: {
    filename: '[name].bundle.js',
    chunkFilename: '[id].bundle.js',
    path: path.resolve(__dirname, 'dist/frontend'),
  },
}

var path = require("path")

const config = {
  entry: './index.ts',
  devtool: 'source-map',
  target: 'web',
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'karo-engine.js',
    path: path.resolve(__dirname, "dist"),
    library: "KaroEngine",
    globalObject: "this"
  }
};

module.exports = config
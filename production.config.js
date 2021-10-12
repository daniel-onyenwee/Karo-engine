var path = require("path")

const config = {
  entry: './index.ts',
  target: 'web',
  mode: 'production',
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
    filename: 'karo-engine.min.js',
    path: path.resolve(__dirname, "dist"),
    library: "KaroEngine",
    globalObject: "this"
  }
};

module.exports = config
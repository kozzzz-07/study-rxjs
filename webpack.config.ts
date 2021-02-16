import * as path from "path";
import * as webpack from "webpack";
import HtmlWebPackPlugin from "html-webpack-plugin";

const module: webpack.Module = {
  rules: [
    {
      test: /\.ts$/,
      loader: "ts-loader",
    },
    {
      test: /\.html$/,
      loader: "html-loader",
    },
  ],
};

const resolve: webpack.Resolve = {
  extensions: [".ts", ".js"],
};

const config: webpack.Configuration = {
  // mode: "development",
  entry: "./src/index.ts",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html",
    }),
  ],
  devtool: "inline-source-map",
  devServer: {
    contentBase: "./dist",
  },
  module,
  resolve,
};

export default config;

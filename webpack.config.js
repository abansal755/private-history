const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
	entry: {
		background: "./src/background.js",
		options: "./src/options/index.js",
	},
	output: {
		path: path.resolve(__dirname, "build"),
		filename: "[name].js",
	},
	plugins: [
		new CopyPlugin({
			patterns: [
				{
					from: "public",
				},
			],
		}),
		new webpack.ProvidePlugin({
			React: "react",
		}),
		new HtmlWebpackPlugin({
			template: "./src/options/index.html",
			filename: "options.html",
			chunks: ["options"],
		}),
	],
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ["@babel/preset-env", "@babel/preset-react"],
					},
				},
			},
		],
	},
	resolve: {
		extensions: [".jsx", ".js"],
	},
};

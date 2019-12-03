/* eslint-disable no-undef */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

process.env.NODE_ENV = 'development';

const DIST_DIR = path.resolve(__dirname, 'build');
const SRC_DIR = path.resolve(__dirname, 'src');

module.exports = {
	mode: 'development',
	target: 'web',
	entry: path.resolve(SRC_DIR, 'index.js'),
	output: {
		path: DIST_DIR,
		filename: 'bundle.js',
	},
	devServer: {
		contentBase: __dirname + '/public/',
		stats: 'minimal',
		historyApiFallback: true,
		disableHostCheck: true,
		headers: { 'Access-Control-Allow-Origin': '*' },
		https: false,
		port: 8000,
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve('./public/index.html'),
			inject: true,
		}),
		new Dotenv({
			path: path.resolve(__dirname, './.env'),
		}),
	],
	module: {
		rules: [
			{
				test: /.(js|jsx)$/,
				exclude: /node_modules/,
				use: ['babel-loader', 'eslint-loader'],
			},
			{
				test: /.(jpg|jpeg|png|gif|svg)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[path][name]-[hash:8].[ext]',
						},
					},
				],
			},
			{
				test: /\.s[ac]ss$/i,
				use: [
					// Creates `style` nodes from JS strings
					'style-loader',
					// Translates CSS into CommonJS
					'css-loader',
					// Compiles Sass to CSS
					'sass-loader',
				],
			},
		],
	},
};

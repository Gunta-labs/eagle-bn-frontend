/* eslint-disable no-undef */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

process.env.NODE_ENV = 'development';

const DIST_DIR = path.resolve(__dirname, 'build');
const SRC_DIR = path.resolve(__dirname, 'src');

module.exports = {
	entry: {
		main: ['@babel/polyfill', `${path.resolve(SRC_DIR, 'index.js')}`],
	},
	mode: 'development',
	target: 'web',
	output: {
		path: DIST_DIR,
		filename: 'bundle.js',
		publicPath: '/',
	},
	devServer: {
		hot: true,
		contentBase: __dirname + '/public/',
		stats: 'minimal',
		disableHostCheck: true,
		headers: {
			'Access-Control-Allow-Origin': '*',
		},
		https: false,
		port: 8000,
		historyApiFallback: {
			disableDotRule: true,
		},
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve('./public/index.html'),
			inject: true,
		}),
		new Dotenv({
			path: path.resolve(__dirname, './.env'),
			safe: true,
			systemvars: true,
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

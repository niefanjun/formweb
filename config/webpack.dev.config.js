const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.config.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const hotMiddlewareScript = 'webpack-hot-middleware/client?reload=true';

const dev =  merge(common, {
	mode: 'production',
	entry: {
		index: ['./src/index.js',hotMiddlewareScript],
		framework: ['react','react-dom'],
	},
	output: {
		filename: 'js/[name].[hash:8].bundle.js',
	},
	plugins: [
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: 'public/index.html',
			inject: 'body',
			minify: {
				removeComments: true,
				collapseWhitespace: true
			}
		}),
		new webpack.HotModuleReplacementPlugin()
	]
});

module.exports = dev
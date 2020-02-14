const merge = require('webpack-merge');
const common = require('./webpack.common.config.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const prod = merge(common, {
	mode: 'production',
	entry: {
		index: './src/index.js',
		framework: ['react','react-dom'],
	},
	output: {
		filename: 'js/[name].[chunkhash:8].bundle.js',
	},
	optimization: {
		minimizer: [
			new TerserPlugin(),
		],
		splitChunks: {
			chunks: 'all',
			minSize: 30000,
			maxSize: 0,
			minChunks: 1,
			cacheGroups: {
				framework: {
					test: 'framework',
					name: 'framework',
					enforce: true,
				},
				vendors: {
					priority: -10,
					test: /node_modules/,
					name: 'vendor',
					enforce: true
				}
			}
		}
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
		new CleanWebpackPlugin(),
	]
});

module.exports = prod
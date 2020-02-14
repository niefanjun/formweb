const createError = require('http-errors');
const express = require('express');
const path = require('path');

const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const app = express();
const config = require('./config/webpack.dev.config.js');

// 开发模式
if (process.env.NODE_ENV === 'dev') {
	const compiler = webpack(config);
	// webpack热更新
	app.use(webpackDevMiddleware(compiler,{
		publicPath: '/'
	}))
	app.use(webpackHotMiddleware(compiler, {
		log: console.log, path: '/__webpack_hmr', heartbeat: 10 * 1000
	}));
}


app.use(express.static(path.join(__dirname, 'dist')));

app.get('/home',function(req,res) {
	res.setHeader('Content-Type', 'text/html');
	res.sendFile( __dirname + '/dist/index.html' );
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

module.exports = app;

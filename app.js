const createError = require('http-errors');
const express = require('express');
// 引入json解析中间件
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');

const Data = require('./server/data.js');

const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

// 连接数据库
const dbRoute = 'mongodb://xxxx:xxxx@xxxx:27017/xxxx';
mongoose.connect(dbRoute, {
	useNewUrlParser: true,
	useUnifiedTopology: true
});
let db = mongoose.connection;
//检查与数据库的连接是否成功
db.once('open', () => console.log('connected to the database'));
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

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

// bodyparser处理json和urlencoded请求
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: false}));

app.get('/home',function(req,res) {
	res.setHeader('Content-Type', 'text/html');
	res.sendFile( __dirname + '/dist/index.html' );
})

app.post('/addData',function(req,res) {
	const name = req.body.name||'';
	const phone = req.body.phone||'';
	if (name&&phone) {
		const data = new Data();
		data.name = name;
		data.phone = phone;
		data.save((err) => {
			if (err) return res.json({ success: false, error: err });
			return res.json({ success: true });
		})
	} else {
		res.json({success: false, error: 'no data input'});
	}
})

app.get('/wo8shiPUTONGREN',function(req,res) {
	Data.find((err, data) => {
		if (err) return res.json({ success: false, error: err });
		return res.json({ success: true, data: data });
	});
})


// catch 404 and forward to error handler
app.use(function(req, res, next) {
	next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
	// render the error page
	res.status(err.status || 500);
	res.send('error');
});

module.exports = app;

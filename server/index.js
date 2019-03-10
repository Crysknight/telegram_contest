const path = require('path');
const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');

const app = express();
const config = require('../webpack.config.js');
const chartData = require('./chart_data.json');
const compiler = webpack(config);

const resolve = pathName => path.resolve(config.output.publicPath, pathName);

app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath
}));

app.get('/api/data', (req, res) => {
    res.send(chartData);
});

app.listen(8080, () => {
    console.log('It\' ok!\n');
});

let express = require('express');
let bodyParser = require('body-parser');
let webpack = require('webpack');
let webpackDevMiddleware = require('webpack-dev-middleware');
let webpackHotMiddleware = require('webpack-hot-middleware');
let config = require('../webpack.config.dev.js');

let app = express();
let router = require('./router');
let compiler = webpack(config);
let port = config.devServer.port;

app.use('/favicon.ico', (req, res, nect) => {
    res.send('')
})

app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    hot: true,
    stats: {
        colors: true
    }
}));
app.use(webpackHotMiddleware(compiler));

app.use(express.static(__dirname + 'dist'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(router);

app.listen(port, function() {
    console.log('server started on port ' + port);
});
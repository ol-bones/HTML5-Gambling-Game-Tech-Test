var express = require('express');
var server = express();
var fs = require('fs');

var mw_logger = require('./middleware/mw_requestlog.js');

server.use(mw_logger());
server.use(express.static('./../client/content'));
server.set('view engine', 'ejs');

var client_js_includes;

function filter_swp(name) {
    return !name.includes(".swp");
}

fs.readdir('./../client/content/js/', (err, files) => {
    client_js_includes = files.filter(filter_swp);
})

server.get('/', function (req, res) {
    res.render('index', {js_includes: client_js_includes});
});

server.listen(5000);

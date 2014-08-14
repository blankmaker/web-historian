var path = require('path');
var archive = require('../helpers/archive-helpers');
var handlerHelpers = require('./http-helpers');
var url = require('url');
var fs = require('fs');
// require more modules/folders here!
var directory = path.dirname(__dirname);
var file;


var handleGet = function(req, res) {
  //default: for not-found urls
  var statusCode = 404;
  file = '/web/public/notfound.html';

  if(req.url === '/') {
    file  = '/web/public/index.html';
    statusCode = 200;
  }
  if(req.url ==='/www.google.com') {
    file = '/archives/sites/www.google.com';
    statusCode = 200;
  }


  var asset = path.join(directory, file);
  console.log('asset: ', asset);
  console.log('req url: ', req.url);
  handlerHelpers.serveAssets(res, asset, statusCode);
};

var handlePost = function(req, res) {
  //listen for the data in request
  var userUrl = '';
  req.on('data', function(chunk) {
    userUrl += chunk;
  });
  req.on('end', function() {
    userUrl = userUrl.slice(4) + '\n';
    // passes in path for appendFile
    archive.addUrlToList(userUrl);

    // sends back loading.html
    file = '/web/public/loading.html'
    var asset = path.join(directory, file);
    handlerHelpers.serveAssets(res, asset, 302);

  });
};



var actionMap = {
  'GET': handleGet,
  'POST': handlePost
};

exports.handleRequest = function (req, res) {

  console.log('Serving request type ' + req.method + ' for url ' + req.url);

  var actionType = actionMap[req.method];

  if (actionType) {
    actionType(req, res);
  }

  // res.end(archive.paths.list);

};



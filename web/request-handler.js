var path = require('path');
var archive = require('../helpers/archive-helpers');
var handlerHelpers = require('./http-helpers');
var url = require('url');
var fs = require('fs');
// require more modules/folders here!


var handleGet = function(req, res) {
  var directory = path.dirname(__dirname);
  console.log(directory);
  var file;
    if(req.url === '/') {
      file  = '/web/public/index.html';
    }
    if(req.url ==='/www.google.com') {
      file = '/archives/sites/www.google.com';
    }


  var asset = path.join(directory, file);

  handlerHelpers.serveAssets(res, asset, handlerHelpers.sendResponse);

};

var actionMap = {
  'GET': handleGet
};

exports.handleRequest = function (req, res) {

  console.log('Serving request type ' + req.method + ' for url ' + req.url);

  var actionType = actionMap[req.method];

  if (actionType) {
    actionType(req, res);

  }

  // res.end(archive.paths.list);

};



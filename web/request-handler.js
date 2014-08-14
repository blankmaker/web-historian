var path = require('path');
var archive = require('../helpers/archive-helpers');
var handlerHelpers = require('./http-helpers');
var url = require('url');
var fs = require('fs');
// require more modules/folders here!
var directory = path.dirname(__dirname);
var file;


var handleGet = function(req, res) {
    if(req.url === '/') {
      file  = '/web/public/index.html';
    }
    if(req.url ==='/www.google.com') {
      file = '/archives/sites/www.google.com';
    }
  var asset = path.join(directory, file);
  handlerHelpers.serveAssets(res, asset, handlerHelpers.sendResponse);
};

var handlePost = function(req, res) {
  //listen for the data in request
  var userUrl = '';
  req.on('data', function(chunk) {
    userUrl += chunk;
  });
  req.on('end', function() {
    // var parsedUserUrl = JSON.parse(userUrl);
    console.log('UserUrl: ',userUrl);
    console.log(typeof userUrl); // we prob don't need to parse
        // file = '/archives/sites.text';
    // var asset = path.join(directory, file);
    // console.log('asset: ', asset);
    // fs.appendFile(asset, parsedUserUrl, function (err) {
    //   if (err) {throw err;}
    //   console.log('parsedUrl: ', parsedUserUrl);
    // });
    // redirect to loading screen
    // send response code 302
    //
  });
};
// exports.sendResponse = function(response, data, statusCode){
//   statusCode = statusCode || 200;
//   response.writeHead(statusCode, exports.headers);
//   console.log('data: ', data);
//   response.end(JSON.stringify(data));
// };




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



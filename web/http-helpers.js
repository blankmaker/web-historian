var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

exports.headers = headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "text/html"
};




exports.sendResponse = function(response, data, statusCode){
  statusCode = statusCode || 200;
  response.writeHead(statusCode, exports.headers);
  console.log('data: ', data);
  response.end(JSON.stringify(data));
};


exports.serveAssets = function(res, asset, callback) {
  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...), css, or anything that doesn't change often.)
  // fs.readFile(asset, 'utf-8', function (err, data) {
  //   if (err) {
  //     throw err;
  //   }
  //   handlerHelpers.sendResponse(res, data);
  // });
  fs.readFile(asset, 'utf-8', function (err, data) {
    if (err) {
      throw err;
    }
    callback(res, data);
  });
};

// };

// var sys = require('sys'),
//     index;

// http.createServer(function(request, response) {
//     response.writeHeader(200, {"Content-Type": "text/html"});
//     response.write(index);
//     response.close();
// }).listen(8000);

// As you progress, keep thinking about what helper functions you can put here!

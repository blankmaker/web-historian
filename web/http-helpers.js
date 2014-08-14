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





exports.serveAssets = function(res, asset, statusCode) {

  fs.readFile(asset, 'utf-8', function (err, data) {
    if (err) {
      throw err;
    }
    statusCode = statusCode || 200;
    res.writeHead(statusCode, exports.headers);
    res.end(JSON.stringify(data));
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

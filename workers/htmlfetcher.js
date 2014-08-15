// eventually, you'll have some code here that uses the code in `archive-helpers.js`
// to actually download the urls you want to download.
var request = require('request');
var fs = require('fs');
var path = require('path');
var archive = require('../helpers/archive-helpers');


var directory = path.dirname(__dirname);

var archiveUrls = function(urls) {
  urls.forEach(scrapePage);
};

var scrapePage = function(url) {
  var http = 'http://' + url;
  console.log(http);

  request(http, function (error, response, html) {
    if (!error && response.statusCode === 200) {
      var file = '/archives/sites';
      var d = new Date();
      var minutes = d.getMinutes();
      var txtName = '/' + url + '_' + minutes;
      var fileName = path.join(directory, file, txtName);
      fs.writeFile(fileName, html);
    }
  });
};

archive.readListOfUrls(archiveUrls);




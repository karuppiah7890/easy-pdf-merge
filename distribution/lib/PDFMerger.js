'use strict';

var fs = require('fs');
var exec = require('child_process').exec;
var path = require('path');

function checkSrc(src, callback) {

  if (!Array.isArray(src)) return callback('Source is not an Array');else if (src.length < 2) return callback('There must be atleast 2 input files');

  var norm_src = [];

  for (var i = 0; i < src.length; i++) {

    if (typeof src[i] === 'string') {

      /*
      //Check if source file exists
       fs.stat(src[i],function(err,stats){
         if(err)
          return callback('Can\'t access file : ' + src[i]);
         if(!stats.isFile())
          return callback(src[i] + ' is not a File');
       });*/

      norm_src.push('"' + src[i] + '"');
    } else return callback('Source : ' + src[i] + ' + , is not a file name');
  }

  callback(null, norm_src);
}

module.exports = function (src, dest, opts, callback) {

  var defaultOpts = {
    maxBuffer: 1024 * 500, // 500kb
    maxHeap: '' // for setting JVM heap limits
  };

  // this will help to fix the old code using the function without opts
  if (!callback) {
    callback = opts;
    opts = defaultOpts;
  }

  // if opts is null, we will set the default options
  if (!opts) {
    opts = defaultOpts;
  }

  var dirPathArr = __dirname.split(path.sep);

  dirPathArr.pop();
  dirPathArr.pop();
  dirPathArr.push('jar');
  dirPathArr.push('pdfbox.jar');

  var jarPath = dirPathArr.join(path.sep);

  var command = ['java -jar ' + (opts.maxHeap ? "-Xmx " + opts.maxHeap : "") + ' "' + jarPath + '" PDFMerger'];

  checkSrc(src, function (err, norm_src) {

    if (err) return callback(err);

    command = command.concat(norm_src);

    command.push('"' + dest + '"');

    delete opts.maxHeap;

    var child = exec(command.join(' '), opts, function (err, stdout, stderr) {

      if (err) return callback(err);

      callback(null);
    });

    child.on('error', function (err) {
      return callback('Execution problem. ' + err);
    });
  });
};
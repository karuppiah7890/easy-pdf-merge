const execFile = require('child_process').execFile;
const path = require('path');
const fs = require('fs');

function checkSrc(src, callback) {
  if (!Array.isArray(src)) {
    return callback('Source is not an Array');
  } else if (src.length < 2) {
    return callback('There must be atleast 2 input files');
  }

  const norm_src = [];

  for (let i = 0; i < src.length; i++) {
    if (typeof src[i] === 'string') {
      if (fs.existsSync(src[i])) {
        // Passed to execFile as a literal argv element - no shell, no quoting needed.
        norm_src.push(src[i]);
      } else {
        return callback(`File "${src[i]}" does not exist`);
      }
    } else {
      return callback(`Source : ${src[i]} + , is not a file name`);
    }
  }

  callback(null, norm_src);
}

module.exports = function (src, dest, opts, callback) {
  const defaultOpts = {
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

  const dirPathArr = __dirname.split(path.sep);

  dirPathArr.pop();
  dirPathArr.pop();
  dirPathArr.push('jar');
  dirPathArr.push('pdfbox.jar');

  const jarPath = dirPathArr.join(path.sep);

  // Argument vector for execFile. The binary is invoked directly, so no shell
  // metacharacter in a path can be interpreted.
  let args = [
    "-jar", jarPath, "PDFMerger"
  ];

  let maxHeapOpt = opts.maxHeap ? '-Xmx' + opts.maxHeap : null
  if (maxHeapOpt) {
    args.splice(1, 0, maxHeapOpt)
  }

  checkSrc(src, function (err, norm_src) {
    if (err) {
      return callback(err);
    }

    args = args.concat(norm_src);

    args.push(dest);

    delete opts.maxHeap;

    const child = execFile("java", args, opts, function (err, stdout, stderr) {
      if (err) {
        return callback(err);
      }

      callback(null);
    });

    child.on('error', function (err) {
      return callback(`Execution problem. ${err}`);
    });
  });
};

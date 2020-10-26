var path = require('path');
var merge = require(`./source/index.js`);

merge([`test${path.sep}github cheat sheet.pdf`, `test${path.sep}text_extraction.pdf`], `test${path.sep}Out.pdf`, function (err) {

  if (err)
    return console.log(err);

  console.log("Success");
});

let opts = {
  maxBuffer: 1024 * 500, // 500kb
  maxHeap: '' // for setting JVM heap limits
}

merge([`test${path.sep}github cheat sheet.pdf`, `test${path.sep}text_extraction.pdf`], `test${path.sep}Out.pdf`, opts, function (err) {

  if (err)
    return console.log(err);

  console.log("Success");
});

opts = {
  maxBuffer: 1024 * 500, // 500kb
  maxHeap: '10m' // for setting JVM heap limits
}

merge([`test${path.sep}github cheat sheet.pdf`, `test${path.sep}text_extraction.pdf`], `test${path.sep}Out.pdf`, opts, function (err) {

  if (err)
    return console.log(err);

  console.log("Success");
});

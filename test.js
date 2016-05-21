var path = require('path');
var merge = require(`./index.js`);

merge([`test${path.sep}github cheat sheet.pdf`,`test${path.sep}text_extraction.pdf`],`test${path.sep}Out.pdf`,function(err){

          if(err)
          return console.log(err);

          console.log("Success");
});

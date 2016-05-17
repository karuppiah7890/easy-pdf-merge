var merge = require('../lib/PDFMerger');

merge(['test/github cheat sheet.pdf','test/text_extraction.pdf'],'test/Out.pdf',function(err,stdout,stderr){

          if(err)
          return console.log(err);

          console.log("Success");
});

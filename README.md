## easy-pdf-merge

easy-pdf-merge is a node module to merge multiple PDFs into a single PDF easily. This module uses [Apache PDFBox Library 2.0.1](http://pdfbox.apache.org). No special softwares are required for the module to run. But Java 6 or higher must be present.

Currently only callback style is supported.

## Usage :

```
var merge = require('easy-pdf-merge');

merge(source_files,dest_file_path,function(err){

        if(err)
        return console.log(err);

        console.log('Success');

});

```

source_files must be an array, with two or more files, or the module throws an error accordingly.
dest_file path is the destination for the merged PDF.

For all files, it is recommended to give absolute paths to avoide problems. Or, give paths relative to `process.cwd();` , which is the current working directory of the process.

## Example

```
merge(['File One.pdf','File Two.pdf'],'File Ouput.pdf',function(err){

        if(err)
        return console.log(err);

        console.log('Successfully merged!');

});
```

## Coming Soon :
  1. Module will check if source files exist and return appropriate error.
  2. Merge PDFs showing the progess percentage - useful while there are lots of PDFs to be merged. But this feature would mean that - callback will be called more than once. But there will be status codes to ensure the end of calling callbacks.

## Reporting Issues and Feature Requests

For reporting issues and for feature requests, go to the [github issues page of the module](https://github.com/karuppiah7890/easy-pdf-merge/issues)

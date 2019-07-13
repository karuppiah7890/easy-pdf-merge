## easy-pdf-merge [![Patreon][patreon-badge]][patreon-link] [![Paypal][paypal-badge]][paypal-link]

[patreon-badge]: https://img.shields.io/endpoint.svg?url=https%3A%2F%2Fshieldsio-patreon.herokuapp.com%2Fkaruppiah7890&style=flat-square
[patreon-link]: https://patreon.com/karuppiah7890

[paypal-badge]: https://img.shields.io/badge/Paypal-Donate!-%2300457C.svg?logo=paypal&style=flat-square
[paypal-link]: https://paypal.me/karuppiah7890

easy-pdf-merge is a node module to merge multiple PDFs into a single PDF easily. This module uses [Apache PDFBox Library 2.0.16](http://pdfbox.apache.org). No special softwares are required for the module to run. But Java 6 or higher must be present.

This project is currently maintained! Contributions through PRs are welcome. I will try to add a contributing guide. If you benefit from this project, buy the original author a cup of coffee by donating through [Paypal](https://www.paypal.me/karuppiah7890)

Currently only callback style is supported. That is only Async functions are supported.

## Install :

```
$ npm install --save easy-pdf-merge
```

## Usage :

```
const merge = require('easy-pdf-merge');

merge(source_files,dest_file_path,function(err){
  if(err) {
    return console.log(err)
  }
  console.log('Success')
});

```

source_files must be an array of file paths, with two or more file paths, or the module throws an error accordingly.
dest_file path is the destination path for the merged PDF to be saved.

For all files, it is recommended to give absolute paths to avoid possible path based problems in your code. Or, give paths relative to `process.cwd();` , which is the current working directory of the process. But be careful when giving relative paths, to avoid bugs.

## Example

### Using relative file paths
```
merge(['File One.pdf', 'File Two.pdf'], 'File Ouput.pdf', function(err){
  if(err) {
    return console.log(err)
  }
  console.log('Successfully merged!')
});
```

### Using absolute file paths
```
merge(['/home/karuppiah/File One.pdf', '/home/karuppiah/File Two.pdf'], '/home/karuppiah/Desktop/File Ouput.pdf', function(err) {
  if(err) {
    return console.log(err)
  }
  console.log('Successfully merged!')
});
```

## An App based on easy-pdf-merge!

[PDF Merger](https://github.com/karuppiah7890/pdf-merger-app) is a cross platform Desktop App being developed using [Electron Framework](http://electron.atom.io) and [easy-pdf-merge module](https://www.npmjs.com/package/easy-pdf-merge). You can find the source code of the App [here](https://github.com/karuppiah7890/pdf-merger-app).

## Coming Soon :
  1. Module will check if source files exist and return appropriate error.
  2. Merge PDFs showing the progess percentage - useful while there are lots of PDFs to be merged. But this feature would mean that - callback will be called more than once. But there will be status codes to ensure the end of calling callbacks.

## Reporting Issues and Feature Requests

For reporting issues and for feature requests, go to the [github issues page of the module](https://github.com/karuppiah7890/easy-pdf-merge/issues)



## License - Apache License 2.0
```
Copyright 2016 Karuppiah N

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
```

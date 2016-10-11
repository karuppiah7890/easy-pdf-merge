#! /usr/bin/env node
'use strict';

const meow = require('meow');
const merge = require('./');

let destFileName = 'MergedFile.pdf';
const cli = meow(`
	Usage
	  $ merge [file ...]
	Options
	  -d Give destination file name.
	Examples
	  $ merge File1.pdf File2.pdf
	  $ merge File1.pdf File2.pdf -d DestFile.pdf
	  $ merge /home/beatfreaker/File1.pdf /home/beatfreaker/File2.pdf -d /home/beatfreaker/DestFile.pdf
`);

if (cli.flags.d) {
    destFileName = cli.flags.d;
}

merge(cli.input, destFileName, function (err) {
    if (err) {
        return console.log(err);
    }
    console.log('Successfully merged!');
});

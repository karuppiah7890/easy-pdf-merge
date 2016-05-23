var fs = require('fs');
var exec = require('child_process').exec;
var path = require('path');

function isFile(file) {

    return new Promise(function(resolve,reject) {

      fs.stat(file,function(err,stats){

        if(err)
          return reject(`Can't access file : ${file}`);

        if(!stats.isFile())
          return reject(`${file} is not a File`);

        if(path.extname(file).toLowerCase()!=='.pdf')
          return reject(`${file} is not a PDF File`);

        resolve();

      });

    });


}

function checkSrc(src){

    return new Promise(function(resolve,reject){

      if(!Array.isArray(src))
      return reject('Source is not an Array');

      else if(src.length<2)
      return reject('There must be atleast 2 input files');

      var norm_src = [];

      for(var i=0;i<src.length;i++){

        if(typeof(src[i])==='string') {

            isFile(src[i])
            .then(function(){
              norm_src.push(`"${src[i]}"`);
            })
            .catch(function(err){
              return reject(err);
            });

        }

        else
          return reject(`Source : ${src[i]} + , is not a file name`);

      }

      if(norm_src.length==src.length)
      resolve(null,norm_src);

    });


}

module.exports = function(src,dest,callback){

      var dirPathArr = __dirname.split(path.sep);

      dirPathArr.pop();
      dirPathArr.push('jar');
      dirPathArr.push('pdfbox.jar');

      var jarPath = dirPathArr.join(path.sep);

      var command = [`java -jar "${jarPath}" PDFMerger`];

      checkSrc(src)
      .then(function(norm_src){

          command = command.concat(norm_src);

          command.push(`"${dest}"`);

          var child = exec(command.join(' '),function(err,stdout,stderr){

              if(err)
                return callback(err);

              callback(null);

          });

          child.on('error',function(err){
            return callback(`Execution problem. ${err}`);
          });

      })
      .catch(function(err){
          callback(err);
      });

};

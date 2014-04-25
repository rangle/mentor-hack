var es = require('event-stream');
var beautify = require('js-beautify').js_beautify;

module.exports = function(opt){
  function modifyFile(file, cb){
    if (file.isNull()) return cb(null, file); // pass along
    if (file.isStream()) return cb(new Error("gulp-beautify: Streaming not supported"));

    var str = file.contents.toString('utf8');

    file.contents = new Buffer(beautify(str, opt));
    cb(null, file);
  }

  return es.map(modifyFile);
};

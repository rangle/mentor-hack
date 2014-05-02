exports.upload = function (req, resp) {
  var fs = require('fs'),
    gm = require('gm'),
    _ = require("underscore"),
    path = require("path"),
    AWS = require("aws-sdk"),
    koast = require("koast"),
    moment = require("moment"),
    imageMagick = gm.subClass({ imageMagick: true }),
    makeKey = function (file) {
      var fileName = file.originalFilename;
      fileName = moment.utc().format('YYYY-MM-DD-hh-mm-ss-') + fileName;
      return 'uploadedImages/' + fileName;
    };

  _.each(req.files, function (file, key) {
    var tmp_path = file.path,
      hashName = [tmp_path.substring(tmp_path.lastIndexOf('/') + 1), '640x470'].join(''),
      target_path = path.resolve(__dirname, '../img/', hashName);

    imageMagick(tmp_path).autoOrient().size(function (err, origSize) {
      if (err) return console.error(err);

      var newHeight = (470 * origSize.height) / origSize.width,
        offsetH = (newHeight / 2) - 235;

      imageMagick(tmp_path).
        autoOrient().
        resize(640).
        stream(function (err, stdout, stderr) {
          imageMagick(stdout).gravity("Center").crop(640, 470).write(target_path, function (err) {
            if (err) return console.error(err);
            console.log("resizing done");

            fs.readFile(target_path, function (err, data) {
              if (err) return console.error(err);

              var awsConfig = koast.getConfig('aws');

              AWS = require('aws-sdk');
              //AWS.config.loadFromPath(awsConfig.configFile);
              AWS.config.update({ "region": "us-east-1" });
              s3 = new AWS.S3();

              var identifier = makeKey(file);
                  params = {
                    Bucket: awsConfig.bucket,
                    Key: identifier,
                    Body: data,
                    ACL: 'public-read',
                    ContentType: file.type
                  };

              s3.putObject(params, function (err, awsResponse) {
                if (err) {
                  throw err;
                } else {
                  console.log("S3 success!", awsResponse);

                  // delete the temporary file, so that the explicitly set temporary upload dir does not get filled with unwanted files
                  fs.unlink(tmp_path, function () {
                    if (err) throw err;

                    fs.unlink(target_path, function () {
                      if (err) throw err;
                      resp.send(200, {
                        file: {
                          url: 'https://' + awsConfig.bucket + '.s3.amazonaws.com/' + identifier
                        }
                      });
                    });
                  });
                }
              });

            });
          });

        });
    });


  });
}

/*exports.upload = function (req, resp) {
  var fs = require('fs'),
    _ = require("underscore"),
    path = require("path"),
    AWS = require("aws-sdk"),
    koast = require("koast");

  var awsConfig = koast.getConfig('aws-config');
  var imageUploader = koast.makeS3FileUploader({
    configFile: awsConfig.configFile,
    bucket: awsConfig.bucket,
    acl: 'public-read',
    makeKey: function (req) {
     var fileName = req.files.attachment.file.originalFilename;
     fileName = moment.utc().format('YYYY-MM-DD-hh-mm-ss-') + fileName;
     return 'uploadedImages/' + fileName;
    },
    respond: function (req, res, key) {
     res.send(200, {
       file: {
         url: 'https://' + awsc.bucket + '.s3.amazonaws.com/' + key
       }
     });
    }
  });
}*/
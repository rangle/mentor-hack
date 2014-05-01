/* global exports, require */

'use strict';

// var _ = require('underscore');
var koast = require('koast');
var connection = koast.getDatabaseConnectionNow();
var mapper = koast.makeMongoMapper(connection);



mapper.filter = function (result, req) {
  return true;
};

// exports.routes.push(['get', 'auth/user/:username', mapper.get('users')]);

exports.routes = [
  ['get', 'users', mapper.get('users', [], ['isMentor'])],
  ['get', 'teams', mapper.get('teams', [], ['displayName', '_id'])],
  ['get', 'teams/:_displayName', mapper.get('teams', [], ['displayName'])],
  ['put', 'users/:_id', mapper.put('users')],
  ['put', 'teams/:_id', mapper.put('teams')],
  ['post', 'users', mapper.post('users')],
  ['post', 'teams', mapper.post('teams')],
  ['del', 'users/:_id', mapper.del('users')],
  ['del', 'teams/:_id', mapper.del('teams')],
	['post', 'img-upload', function (req, resp) {
      var fs = require('fs'),
        gm = require('gm'),
        _ = require("underscore"),
        path = require("path"),
        AWS = require("aws-sdk"),
        imageMagick = gm.subClass({ imageMagick: true });

      _.each(req.files, function (val, key) {
        var tmp_path = val.path,
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


                  var awsConfig = koast.getConfig('aws'),
                  		makeKey = function (req) {
										   var fileName = req.files.attachment.file.originalFilename;
										   fileName = moment.utc().format('YYYY-MM-DD-hh-mm-ss-') + fileName;
										   return 'uploadedImages/' + fileName;
										 };

									AWS = require('aws-sdk');
							    AWS.config.loadFromPath(awsConfig.configFile);
							    s3 = new AWS.S3();

							    var file = req.files.attachment.file;
							    		key = makeKey(req);
							    		params = {
									      Bucket: awsConfig.bucket,
									      Key: key,
									      Body: data,
									      ACL: 'public-read',
									      ContentType: file.type
									    };

							    s3.putObject(params, function (err, awsResponse) {
							      if (err) {
							        throw err;
							      } else {

	                    console.log("S3 success!", awsResponse);
	                    console.timeEnd("s3upload");

	                    // delete the temporary file, so that the explicitly set temporary upload dir does not get filled with unwanted files
	                    fs.unlink(tmp_path, function () {
	                      if (err) throw err;

	                      fs.unlink(target_path, function () {
	                        if (err) throw err;
	                        res.send(200, {
											      file: {
											        url: 'https://' + awsConfig.bucket + '.s3.amazonaws.com/' + key
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
  ]
];
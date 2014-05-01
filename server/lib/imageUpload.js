/**
 * Created by della on 2014-05-01.
 */

app.post('/client/img/mentor', authFns.ensureAPIAuthenticated, function (req, resp) {
  var fs = require('fs'),
    gm = require('gm'),
    imageMagick = gm.subClass({ imageMagick: true });

  _.each(req.files, function (val, key) {
    var tmp_path = val.path,
      hashName = [tmp_path.substring(tmp_path.lastIndexOf('/') + 1), '640x470'].join(''),
      target_path = [rootDir, '/userassets/img/tmp/', hashName].join('');

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
              console.time("s3upload");
              var s3 = new AWS.S3({params: {Bucket: 'MerchApp'}});
              console.log("Starting to send to S3");
              s3.putObject({
                Key: hashName,
                Body: data,
                ACL: 'public-read'
              }, function (err, awsResponse) {
                if (err) return console.error(err);

                console.log("S3 success!", awsResponse);
                console.timeEnd("s3upload");

                // delete the temporary file, so that the explicitly set temporary upload dir does not get filled with unwanted files
                fs.unlink(tmp_path, function () {
                  if (err) throw err;

                  fs.unlink(target_path, function () {
                    if (err) throw err;
                    return Utils.writeJSON(
                      {
                        "msg": ['File uploaded', ' (', val.size, ' bytes).'].join(''),
                        "url": ['https://s3.amazonaws.com/MerchApp/', hashName].join(''),
                        "code": 200
                      },
                      resp
                    );
                  });
                });
              });
            });
          });

        });
    });


  });
});
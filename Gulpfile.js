var gulp = require('gulp');
var jshint = require('gulp-jshint');
var beautify = require('./gulp/gulp-js-beautify');
var karma = require('gulp-karma');
var nodemon = require('gulp-nodemon');
var fs = require('fs');
var less = require('gulp-less');
var path = require('path');
var connect = require('gulp-connect');
var watch = require('gulp-watch');

// var lr = require('tiny-lr');
// var server = lr();

var paths = {
  clientScripts: ['client/app/**/*.js', 'client/app/*.js'],
  serverScripts: ['server/app.js', 'server/lib/**/*.js']
};

var options = {};

paths.allScripts = paths.clientScripts.concat(paths.serverScripts);

options.beautify = JSON.parse(fs.readFileSync('.jsbeautifyrc'));

var testFiles = [
  // 3rd party code
  'client/components-bower/angular/angular.js',
  'client/components-bower/angular-mocks/angular-mocks.js',
  'client/components-bower/koast/client/src/**/*.js',

  // app code
  'client/app/**/*.js',

  // test code
  'client/tests/unit/**.js',
  'client/tests/unit/**/*.js'
];

gulp.task('test-client', function() {
  // Be sure to return the stream
  return gulp.src(testFiles)
    .pipe(karma({
      configFile: 'client/tests/karma.conf.js',
      action: 'run'
    }))
    .on('error', function(err) {
      // Make sure failed tests cause gulp to exit non-zero
      throw err;
    });
});

gulp.task('test-client-watch', function() {
  // Be sure to return the stream
  return gulp.src(testFiles)
    .pipe(karma({
      configFile: 'client/tests/karma.conf.js',
      action: 'watch'
    }))
    .on('error', function(err) {
      // Make sure failed tests cause gulp to exit non-zero
      throw err;
    });
});

gulp.task('lint', function() {
  gulp.src(paths.allScripts)
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('beautify-client', function() {
  gulp.src('./client/app/**/*.js')
    .pipe(beautify(options.beautify))
    .pipe(gulp.dest('./client/app/'));
});

gulp.task('beautify-client-tests', function() {
  gulp.src('./client/tests/**/*.js')
    .pipe(beautify(options.beautify))
    .pipe(gulp.dest('./client/tests/'));
});

gulp.task('less', function() {
  gulp.src('./app/less/app.less')
    .pipe(less({
      paths: [path.join(__dirname, 'less', 'includes')]
    }))
    .pipe(gulp.dest('./app/css'));
});

gulp.task('beautify', ['beautify-client', 'beautify-client-tests']);

gulp.task('default', ['lint']);

gulp.task('develop', function() {
  gulp.watch([
    './app/less/**/*.less',
    './app/less/*.less'
  ], function() {
    gulp.run('less');
  });

  console.log('[CONNECT] Listening on port 3000');
  connect.server({
    root: 'app',
    port: 3000,
    livereload: true
  });

  console.log('[CONNECT] Watching HTML and JS files for live-reload');
  watch({
    glob: ['./www/**/*.html', './www/**/*.js']
  })
    .pipe(connect.reload());
})

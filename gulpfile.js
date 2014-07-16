var gulp = require('gulp'),
  path = require('path');

var concat = require('gulp-concat');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var expect = require('gulp-expect-file');
var mocha = require('gulp-mocha');
var runSequence = require('run-sequence');


var srcFile = './linear-algebra.js';
var minFile = 'linear-algebra.min.js';
var buildFolder = '.'



gulp.task('jshint', function() {
  return gulp.src(srcFile)
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(jshint.reporter('fail'))
  ;
});


gulp.task('js', ['jshint'], function() {
  return gulp.src( srcFile )
    .pipe( concat(minFile) )
    .pipe( uglify() )
    .pipe( gulp.dest(buildFolder) )
    ;
})


gulp.task('verify-js', function() {
  return gulp.src( path.join(buildFolder, '*.min.js') )
    .pipe( expect([
      minFile
    ]) )
  ;
})


gulp.task('test', function () {
  return gulp.src('./test.js', { read: false })
      .pipe(mocha({
        ui: 'exports',
        reporter: 'spec'
      }))
    ;
});


gulp.task('default', function(cb) {
  runSequence('js', 'verify-js', 'test', cb);
});




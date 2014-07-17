var gulp = require('gulp'),
  path = require('path');

var concat = require('gulp-concat');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var expect = require('gulp-expect-file');
var mocha = require('gulp-mocha');
var runSequence = require('run-sequence');


// gulp.task('jshint', function() {
// });



gulp.task('build-lib', function() {
  return gulp.src( [
      './src/_header.js',
      './src/options.js',
      './src/core.js',
      './src/vector.js',
      './src/matrix.js',
      './src/_footer.js'
    ] )
    .pipe( concat('linear-algebra.js') )
    .pipe( gulp.dest('./dist') )
    ;
});


gulp.task('build-precision-lib', function() {
  return gulp.src( [
      './src/_header.js',
      './src/options.precision.js',
      './src/core.js',
      './src/vector.precision.js',
      './src/matrix.precision.js',
      './src/_footer.js'
    ] )
    .pipe( concat('linear-algebra.precision.js') )
    .pipe( gulp.dest('./dist') )
    ;
});


gulp.task('jshint', ['build-lib', 'build-precision-lib'], function() {
  return gulp.src('./dist/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(jshint.reporter('fail'))
  ;
});


gulp.task('minify-lib', ['jshint'], function() {
  return gulp.src('./dist/linear-algebra.js')
    .pipe(concat('linear-algebra.min.js'))
    .pipe(uglify())
    .pipe( gulp.dest('./dist') )
  ;
});


gulp.task('minify-precision-lib', ['jshint'], function() {
  return gulp.src('./dist/linear-algebra.precision.js')
    .pipe(concat('linear-algebra.precision.min.js'))
    .pipe(uglify())
    .pipe( gulp.dest('./dist') )
  ;
});


gulp.task('js', ['minify-lib', 'minify-precision-lib']);


gulp.task('verify-js', function() {
  return gulp.src( path.join('./dist/*.js') )
    .pipe( expect([
      'linear-algebra.js',
      'linear-algebra.min.js',
      'linear-algebra.precision.js',
      'linear-algebra.precision.min.js',
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




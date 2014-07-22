gulp = require('gulp')
path = require('path')

benchmark = require('gulp-bench')
concat = require('gulp-concat')
jshint = require('gulp-jshint')
uglify = require('gulp-uglify')
expect = require('gulp-expect-file')
mocha = require('gulp-mocha')
replace = require('gulp-replace')
runSequence = require('run-sequence')


buildMacros = require('./build/buildMacros')



gulp.task 'build-lib', ->
  gulp.src( [
      './src/_header.js',
      './src/options.js',
      './src/algebra.js',
      './src/algebra-extra.js',
      './src/calculations.js',
      './src/math-transforms.js',
      './src/_footer.js'
    ] )
    .pipe concat('linear-algebra.js') 
    .pipe replace(/BUILD\((.+)\)/g, buildMacros)
    .pipe gulp.dest('./dist')


gulp.task 'build-precision-lib', () ->
  gulp.src( [
      './src/_header.js',
      './src/options.precision.js',
      './src/algebra.js',
      './src/algebra-extra.precision.js',
      './src/calculations.precision.js',
      './src/math-transforms.js',
      './src/_footer.js'
    ] )
    .pipe concat('linear-algebra.precision.js') 
    .pipe replace(/BUILD\((.+)\)/g, buildMacros)
    .pipe gulp.dest('./dist') 


gulp.task 'jshint', ['build-lib', 'build-precision-lib'], () ->
  gulp.src([
        './dist/linear-algebra.js', 
        './dist/linear-algebra.precision.js'
    ])
    .pipe jshint()
    .pipe jshint.reporter('default')
    .pipe jshint.reporter('fail')


gulp.task 'minify-lib', ['jshint'], () ->
  gulp.src('./dist/linear-algebra.js')
    .pipe concat('linear-algebra.min.js')
    .pipe uglify()
    .pipe gulp.dest('./dist') 


gulp.task 'minify-precision-lib', ['jshint'], () ->
  gulp.src('./dist/linear-algebra.precision.js')
    .pipe concat('linear-algebra.precision.min.js')
    .pipe uglify()
    .pipe gulp.dest('./dist') 


gulp.task 'js', ['minify-lib', 'minify-precision-lib']


gulp.task 'verify-js', () ->
  gulp.src( path.join('./dist/*.js') )
    .pipe expect([
      'dist/linear-algebra.js',
      'dist/linear-algebra.min.js',
      'dist/linear-algebra.precision.js',
      'dist/linear-algebra.precision.min.js',
    ]) 


gulp.task 'test',  () ->
  gulp.src('./test/*.test.js', read: false)
      .pipe mocha {
        ui: 'exports',
        reporter: 'spec'
      }


gulp.task 'benchmark',  () ->
  gulp.src('./benchmark/*.perf.js', read: false)
      .pipe benchmark()



gulp.task 'default', (cb) ->
  runSequence 'js', 'verify-js', 'test', cb




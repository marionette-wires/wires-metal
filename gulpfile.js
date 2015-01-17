var gulp        = require('gulp');
var sourcemaps  = require('gulp-sourcemaps');
var to5         = require('gulp-6to5');
var rename      = require('gulp-rename');
var uglify      = require('gulp-uglify');
var filter      = require('gulp-filter');
var jshint      = require('gulp-jshint');
var stylish     = require('jshint-stylish');
var mocha       = require('gulp-mocha');
var istanbul    = require('gulp-istanbul');
var dox         = require('gulp-dox');
var packageName = require('./package').name;

function compile() {
  return gulp.src('src/' + packageName + '.js')
    .pipe(sourcemaps.init())
    .pipe(to5({ modules: 'umd' }))
    .pipe(sourcemaps.write('./'));
}

function test() {
  return gulp.src('test/**.js', { read: false })
    .pipe(mocha({ reporter: 'spec' }));
}

gulp.task('build', function() {
  return compile()
    .pipe(gulp.dest('dist'))
    .pipe(filter(['*', '!**/*.js.map']))
    .pipe(uglify())
    .on('error', console.log)
    .pipe(rename({ extname: '.min.js' }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('dist'));
});

gulp.task('build:tmp', function() {
  return compile()
    .pipe(gulp.dest('tmp'));
});

gulp.task('docs', function() {
  return gulp.src('src/' + packageName + '.js')
    .pipe(dox())
    .pipe(gulp.dest('docs/'));
});

gulp.task('jshint', function() {
  return gulp.src(['src/**/*.js', 'test/**/*.js', '!src/wrapper.js'])
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});

gulp.task('mocha', function() {
  require('6to5/register')({ modules: 'common' });
  return test();
});

gulp.task('coverage', function(done) {
  gulp.src(['src/' + packageName + '.js'])
    .pipe(istanbul())
    .on('finish', function() {
      return test()
      .pipe(istanbul.writeReports())
      .on('end', done);
    });
});

gulp.task('test', ['jshint', 'build:tmp', 'mocha']);

gulp.task('watch', function() {
  gulp.watch('src/**.js', ['test']);
  gulp.watch('test/**.js', ['test']);
});

gulp.task('default', ['test', 'watch']);

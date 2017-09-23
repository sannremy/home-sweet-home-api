var gulp = require('gulp'),
sass = require('gulp-sass');

var sassConfig = {
  inputDirectory: 'src/static/styles/main.scss',
  outputDirectory: 'dist/static/styles',
  options: {
    outputStyle: 'expanded'
  }
}

gulp.task('build:styles', () => {
  return gulp
    .src(sassConfig.inputDirectory)
    .pipe(sass(sassConfig.options).on('error', sass.logError))
    .pipe(gulp.dest(sassConfig.outputDirectory));
});

var browserify = require('gulp-browserify');

gulp.task('build:scripts', function() {
    // Single entry point to browserify
    gulp.src('src/static/scripts/main.js')
      .pipe(browserify({
        insertGlobals: true,
        debug: process.env.NODE_ENV === 'development'
      }))
      .pipe(gulp.dest('dist/static/scripts'))
});

gulp.task('build', ['build:styles', 'build:scripts']);

gulp.task('watch', ['build'], function() {
  gulp.watch('src/static/styles/**/*.scss', ['build:styles']);
  gulp.watch('src/static/scripts/**/*.js', ['build:scripts']);
});

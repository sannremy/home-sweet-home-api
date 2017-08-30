var gulp = require('gulp'),
sass = require('gulp-sass');

var sassConfig = {
  inputDirectory: 'src/static/styles/main.scss',
  outputDirectory: 'dist/static/styles',
  options: {
    outputStyle: 'expanded'
  }
}

gulp.task('build-css', () => {
  return gulp
    .src(sassConfig.inputDirectory)
    .pipe(sass(sassConfig.options).on('error', sass.logError))
    .pipe(gulp.dest(sassConfig.outputDirectory));
});

gulp.task('watch', function() {
  gulp.watch('src/static/styles/**/*.scss', ['build-css']);
});

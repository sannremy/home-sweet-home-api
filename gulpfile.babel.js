import fs from 'fs';
import gulp from 'gulp';
import sass from 'gulp-sass';
import nodemon from 'gulp-nodemon';
import browserify from 'browserify';
import babelify from 'babelify';

/**
 * Style config
 */
const styleConfig = {
  input: './src/static/styles/main.scss',
  output: './dist/static/styles',
  options: {
    outputStyle: 'expanded'
  }
};

gulp.task('build:styles', () => {
  return gulp
    .src(styleConfig.input)
    .pipe(sass(styleConfig.options).on('error', sass.logError))
    .pipe(gulp.dest(styleConfig.output));
});

/**
 * Script config
 */
const scriptConfig = {
  input: './src/static/scripts/main.js',
  output: './dist/static/scripts/main.js',
  babelify: {
    presets: ['env', 'react']
  }
};

gulp.task('build:scripts', function() {
  return browserify(scriptConfig.input)
    .transform(babelify, scriptConfig.babelify)
    .bundle()
    .pipe(fs.createWriteStream(scriptConfig.output));
});

/**
 * Build task
 */
gulp.task('build', ['build:styles', 'build:scripts']);

/**
 * Watch task
 */
gulp.task('watch', ['build'], function() {
  nodemon({
    script: './src/app.js',
    ext: 'js',
    env: { 'NODE_ENV': 'development' }
  });

  gulp.watch('./src/static/styles/**/*.scss', ['build:styles']);
  gulp.watch('./src/static/scripts/**/*.js', ['build:scripts']);
});

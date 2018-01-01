import fs from 'fs';
import path from 'path';
import gulp from 'gulp';
import sass from 'gulp-sass';
import nodemon from 'gulp-nodemon';
import browserify from 'browserify';
import babelify from 'babelify';
import del from 'del';
import mkdirp from 'mkdirp';

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

gulp.task('build:fonts', () => {
  return gulp.src([
      './node_modules/weather-icons-sass/font/**/*',
      './node_modules/font-awesome/fonts/**/*'
    ])
    .pipe(gulp.dest('./dist/static/fonts'));
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

gulp.task('build:scripts', () => {
  mkdirp(path.dirname(scriptConfig.output));

  return browserify(scriptConfig.input)
    .transform(babelify, scriptConfig.babelify)
    .bundle()
    .pipe(fs.createWriteStream(scriptConfig.output));
});

/**
 * Build task
 */
gulp.task('build', ['build:fonts', 'build:styles', 'build:scripts']);

/**
 * Watch task
 */
gulp.task('watch', ['build'], () => {
  nodemon({
    script: './src/app.js',
    ext: 'js',
    env: { 'NODE_ENV': 'development' }
  });

  gulp.watch('./src/static/styles/**/*.scss', ['build:styles']);
  gulp.watch([
    './src/static/scripts/**/*.js',
    './src/views/**/*.js'
  ], ['build:scripts']);
});

/**
 * Clean task
 */
gulp.task('clean:scripts', () => {
  return del([
    './dist/static/scripts'
  ]);
});

gulp.task('clean:styles', () => {
  return del([
    './dist/static/styles'
  ]);
});

gulp.task('clean', ['clean:scripts', 'clean:styles']);

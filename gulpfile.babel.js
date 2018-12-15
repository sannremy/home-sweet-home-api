import gulp from 'gulp';
import nodemon from 'gulp-nodemon';

/**
 * Watch task
 */
gulp.task('watch', () => {
  nodemon({
    script: './src/app.js',
    ext: 'js',
    env: { 'NODE_ENV': 'development' }
  });
});

const gulp = require('gulp');
const babel = require('gulp-babel');
const clean = require('gulp-clean');
const concat = require('gulp-concat');
const env = require('gulp-env');
const eslint = require('gulp-eslint');
const mocha = require('gulp-mocha');
const rename = require('gulp-rename');
const react = require('gulp-react');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const shell = require('gulp-shell');
const uglify = require('gulp-uglify');
const nodemon = require('gulp-nodemon');
const util = require('gulp-util');


// lint with Hack Reactor style guide
gulp.task('lint', () => {
  return gulp.src(['client/views/*.js', './server/**/*.js'], {base: '.'})
    .pipe(eslint())
    .pipe(eslint.format())
    .on('error', util.log);
});

// use Babel to transpile test code
gulp.task('build-client-tests', function () {
  return gulp.src('./tests/client/*.js')
  .pipe(sourcemaps.init())
  .pipe(babel({
    presets: ['es2015']
  }))
  .pipe(gulp.dest('./tests/client-built-tests/'));
});

// run client tests with Mocha
gulp.task('test-client', ['build-client-tests'], function () {
  const mocha = require('gulp-mocha');
  gulp.src('./tests/client-built-tests/*.js', {read: false})
  .pipe(mocha({reporter: 'spec'}));
});

// transform jsx in 'views' into js in 'views-transformed'
gulp.task('es6', function () {
  return gulp.src('client/views/*.js')
  .pipe(react({harmony: false, es6module: true}))
  .pipe(babel({
    presets: ['es2015']
  }))
  .pipe(gulp.dest('client/dist/'));
});

// compile Sass & minify CSS
gulp.task('sass', () => {
  return gulp.src('client/styles/main.scss')
  .pipe(sass({outputStyle: 'compressed'}))
  .pipe(rename('main.min.css'))
  .pipe(gulp.dest('client/dist/'));
});

// watch Sass and JS files for changes and rebuild when they change
gulp.task('watch', () => {
  gulp.watch('client/styles/*.scss', ['sass']);
  gulp.watch('client/views/*.js', ['es6']);
});

// set the NODE_ENV from a config JSON file and run the development server
gulp.task('run', () => {
  env({
    file: './server/config/private/.env.json'
  });
  nodemon({
    script: './server/server.js',
    ext: 'js html'
  });
});

// default task: build sass files, run dev server and watch for changes
gulp.task('default', ['es6', 'sass', 'run', 'watch']);

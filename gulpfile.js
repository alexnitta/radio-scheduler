const gulp = require('gulp');
const babel = require('gulp-babel');
const clean = require('gulp-clean');
const concat = require('gulp-concat');
const env = require('gulp-env');
const eslint = require('gulp-eslint');
const mocha = require('gulp-mocha');
const react = require('gulp-react');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const shell = require('gulp-shell');
const uglify = require('gulp-uglify');
const nodemon = require('gulp-nodemon');
const util = require('gulp-util');


// lint with Airbnb style guide
gulp.task('lint', () => {
  return gulp.src(['client/js/*.js', './server/**/*.js'], {base: '.'})
    .pipe(eslint())
    .pipe(eslint.format())
    .on('error', util.log);
});

// run tests
gulp.task('test', shell.task([
  'mocha tests/client/.setup.js tests/client',
  'jasmine-node tests/server/ --junitreport'
]));

// clean out previous js files
gulp.task('clean-js', () => {  
  return gulp.src('dist/js', {read: false})
    .pipe(clean());
});

// clean out previous css files
gulp.task('clean-css', () => {  
  return gulp.src('dist/css', {read: false})
    .pipe(clean());
});

// transform jsx in 'views' into js in 'views-transformed'
gulp.task('transform', function () {
  return gulp.src('client/views.jsx')
    .pipe(react({harmony: false, es6module: true}))
    .pipe(gulp.dest('client/views-transformed'));
});

// convert es6 syntax to es5
gulp.task('es6', ['transform'], function () {
  return gulp.src('client/views-transformed/*.js')
    .pipe(babel())
    .pipe(gulp.dest('client/views-transformed/'));
});

// concatenate & uglify client-side JS
gulp.task('build-client', ['clean-js', 'es6'], () => {
  return gulp.src('client/views-transformed/*.js')
    .pipe(concat('bundle.js'))
    // .pipe(uglify()) // this is throwing an error, skipping uglify for now
    // .pipe(rename('bundle.min.js'))
    .pipe(gulp.dest('./dist/js/'))
    .on('error', util.log);
});

// compile Sass & minify CSS
gulp.task('sass', ['clean-css'], () => {
  return gulp.src('client/styles/main.scss')
   .pipe(sass({outputStyle: 'compressed'}))
   .pipe(rename('main.min.css'))
   .pipe(gulp.dest('./dist/css/'));
});


// watch Sass and JS files for changes and rebuild when they change
gulp.task('watch', () => {
  gulp.watch('client/views-transformed/*.js', ['build-client']);
  gulp.watch('client/styles/*.scss', ['sass']);
});


// set the NODE_ENV from a config JSON file and run the development server
gulp.task('run', () => {
  env({
    file: './server/config/private/.env.json'
  });
  nodemon({
    script:'./server/server.js',
    ext: 'js html'
  });
});

// default task: build files, run dev server and watch for changes
gulp.task('default', ['build-client', 'run', 'watch']);

const gulp = require('gulp');
const clean = require('gulp-clean');
const concat = require('gulp-concat');
const env = require('gulp-env');
const eslint = require('gulp-eslint');
const mocha = require('gulp-mocha');
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

// clean out previous css files
gulp.task('clean-css', () => {  
  return gulp.src('dist/css', {read: false})
    .pipe(clean());
});

// compile Sass & minify CSS
gulp.task('sass', ['clean-css'], () => {
  return gulp.src('client/styles/main.scss')
   .pipe(sass({outputStyle: 'compressed'}))
   .pipe(rename('main.min.css'))
   .pipe(gulp.dest('./dist/css/'));
});

// watch Sass files for changes and rebuild when they change
gulp.task('watch', () => {
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

// default task: build sass files, run dev server and watch for changes
gulp.task('default', ['sass', 'run', 'watch']);

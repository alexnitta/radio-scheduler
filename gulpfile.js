const gulp = require('gulp');
const babel = require('gulp-babel');
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


// Lint Task
gulp.task('lint', () => {
  return gulp.src(['client/js/*.js', './server/**/*.js'], {base: '.'})
    .pipe(eslint())
    .pipe(eslint.format())
    .on('error', util.log);
});

// Test Task
gulp.task('test', shell.task([
  'mocha tests/client/.setup.js tests/client',
  'jasmine-node tests/server/ --junitreport'
]));

// Set the NODE_ENV from a config JSON file
gulp.task('env', () => {
  env({
    file: './server/config/.env.json'
  });
});

// Clean out previous dist folder
gulp.task('clean', () => {  
  return gulp.src('dist', {read: false})
    .pipe(clean());
});

// Concatenate & Uglify client-side JS
  // 'clean' must finish before this will start
gulp.task('build-client', ['clean'], () => {
  return gulp.src('client/js/*.js')
    .pipe(concat('bundle.js'))
    .pipe(uglify())
    .pipe(rename('bundle.min.js'))
    .pipe(gulp.dest('./dist/'))
    .on('error', util.log);
});

// Compile Sass & minify CSS
gulp.task('sass', () => {
  return gulp.src('client/styles/main.scss')
   .pipe(sass({outputStyle: 'compressed'}))
   .pipe(rename('main.min.css'))
   .pipe(gulp.dest('./dist/'));
});


// Watch Files For Changes
gulp.task('watch', () => {
  gulp.watch(['client/js/*.js', 'tests/**'], ['lint', 'test']);
  gulp.watch('client/styles/*.scss', ['sass']);
});

// Default Task
gulp.task('default', ['lint', 'test', 'watch']);

// Clean / Concatenate / Minify
gulp.task('build', ['env', 'clean', 'build-client']);

// // Build client files and start deployed server
// gulp.task('run', ['build', 'forever']);



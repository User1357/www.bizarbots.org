/* jshint esversion:6 */
const gulp = require('gulp');
const gih = require("gulp-include-html");
const htmlmin = require('gulp-htmlmin');

gulp.task('default', function() {
    return gulp.src('./src/**/*.html')
    .pipe(gulp.dest('bin'));
});

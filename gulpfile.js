/* jshint esversion:6 */
const gulp = require('gulp');
const gih = require("gulp-include-html");
const htmlmin = require('gulp-htmlmin');

gulp.task('default', function() {
    gulp.src('./src/**/*.html')
    .pipe(gih())
    //.pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('bin'));

    gulp.src('./static/**/*.*')
    .pipe(gulp.dest('bin'))
});

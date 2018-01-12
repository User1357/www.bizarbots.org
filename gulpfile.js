/* jshint esversion:6 */
const gulp = require('gulp');
const gih = require("gulp-include-html");
const htmlmin = require('gulp-htmlmin');

gulp.task('html', function() {
    return gulp.src('./src/**/*.html')
    .pipe(gih())
    //.pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('bin'));
});

gulp.task('assets', function() {
    return gulp.src('./static/assets/**/*.*')
    .pipe(gulp.dest('bin/assets'));
});

gulp.task('gallery', function() {
    return gulp.src('./static/gallery/**/*.*')
    .pipe(gulp.dest('bin/assets/img/gallery'));
});

gulp.task('netlify', function() {
    return gulp.src('./static/_headers').pipe(gulp.dest('bin'));
});

gulp.task('site', [
    'html', 'assets', 'netlify'
]);

gulp.task('default', [
    'site', 'gallery'
]);

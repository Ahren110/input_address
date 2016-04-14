/**
 * my gulp file
 * @author chen
 * @email chen.orange@aliyun.com
 * @website http://findchen.com
 */

var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var del = require('del');

/** sass **/
gulp.task('sass', function(){
    return gulp.src('app/scss/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({stream:true}));
});

/** clean for build **/
gulp.task('clean', function(){
    return del.sync('dist');
});

/** browserSync **/
gulp.task('browserSync', function(){
    browserSync.init({
        server: {
            baseDir: 'app'
        }
    });
});

/** default **/
gulp.task('default', ['sass', 'browserSync'], function(){
    gulp.watch('app/scss/*.scss', ['sass']);
    gulp.watch('app/js/*.js', ['browserSync']);
    gulp.watch('app/**/*.html', ['browserSync']);
});

/** build **/
gulp.task('build', ['clean', 'sass'], function(){
    return gulp.src(['app/*.html', 'app/css/*', 'app/js/*'])
        .pipe(gulp.dest('dist'))
});

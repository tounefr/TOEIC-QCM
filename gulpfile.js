var gulp = require('gulp');
var minify = require('gulp-minify');
var concat = require('gulp-concat');

gulp.task('compress', function () {

    gulp.src([  'node_modules/jquery/dist/jquery.min.js',
                'node_modules/bootstrap/dist/js/bootstrap.min.js',
                'bower_components/mustache.js/mustache.min.js',
                'src/assets/js/app.js'])
        .pipe(concat('main.js'))
        .pipe(minify({
            ext: {
                src: '',
                min: '.js'
            }
        }))
        .pipe(gulp.dest('src/assets/js'));

    gulp.src([  'node_modules/bootstrap/dist/css/bootstrap.min.css',
                'bower_components/font-awesome/css/font-awesome.min.css',
                'node_modules/pretty-checkbox/src/pretty.css',
                'src/assets/css/app.css'])
        .pipe(concat('main.css'))
        .pipe(minify({
            ext: {
                src: '',
                min: '.css'
            }
        }))
        .pipe(gulp.dest('src/assets/css'));

    gulp.src(['node_modules/bootstrap/fonts/*', 'bower_components/font-awesome/fonts/*'])
        .pipe(gulp.dest('./src/assets/fonts/'))
});
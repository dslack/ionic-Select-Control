var gulp = require('gulp');
var cssnano = require('gulp-cssnano');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var mainBowerFiles = require('main-bower-files');

gulp.task('default', ['minify-javascript', 'minify-css']);

gulp.task('minify-javascript', function (done) {
    gulp.src('./src/*.js')
        .pipe(sourcemaps.init())
        .pipe(uglify(),
          {
            mangle: false,
            output: { beautify: true }
          })
        .pipe(rename({ extname: '.min.js' }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./dist/'))
        .on('end', done);
});

gulp.task('minify-css', function (done) {
    gulp.src('./src/*.css')
        .pipe(cssnano())
        .pipe(rename({ extname: '.min.css' }))
        .pipe(gulp.dest('./dist/'))
        .on('end', done);
});

gulp.task('test-main-bower-files', function(done) {
    var files = mainBowerFiles();
    console.log(files);
    gulp.src(files, { base: './bower_components' })
        .pipe('./dist/test/')
        .on('end', done);
});


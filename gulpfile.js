var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var browserSync = require('browser-sync').create();
var smartgrid = require('smart-grid');
var clean = require('gulp-clean');
var connect = require('gulp-connect-php');

gulp.task('smartgrid', function () {
    /* It's principal settings in smart grid project */
    var settings = {
        outputStyle: 'scss', /* less || scss || sass || styl */
        columns: 12, /* number of grid columns */
        offset: '30px', /* gutter width px || % */
        mobileFirst: false, /* mobileFirst ? 'min-width' : 'max-width' */
        container: {
            maxWidth: '980px', /* max-width оn very large screen */
            fields: '30px' /* side fields */
        },
        breakPoints: {
            lg: {
                width: '960px', /* -> @media (max-width: 1100px) */
            },
            md: {
                width: '780px'
            },
            sm: {
                width: '560px',
                fields: '15px' /* set fields only if you want to change container.fields */
            },
            xs: {
                width: '320px'
            }
        }
    };
    smartgrid('./app/scss/', settings);
});
gulp.task('sass',['smartgrid'], function () {
    gulp.src('./app/scss/main.scss')
        .pipe(autoprefixer()) // автопрефикс
        .pipe(sass(
            {
                includePaths: require('node-normalize-scss').includePaths,
                outputStyle: 'compressed' // тип выхода
            }))
        .pipe(gulp.dest('./dist/css/'))
});
gulp.task('html', function () {
    gulp.src('./app/*.html').pipe(gulp.dest('./dist/'));
});
gulp.task('libs', function() {
    return gulp.src([
        'app/js/jquery.min.js',
        'app/js/libs/*.js',
        'app/js/common.js'
    ])
        .pipe(concat('scripts.min.js')) // Собираем их в кучу в новом файле libs.min.js
        .pipe(uglify()) // Сжимаем JS файл
        .pipe(gulp.dest('./dist/js')) // Выгружаем в папку app/js
});
gulp.task('compress',['clean-img'], function() {
    gulp.src('./app/img/*')
        .pipe(imagemin([
            imagemin.gifsicle({interlaced: true}),
            imagemin.jpegtran({progressive: true}),
            imagemin.optipng({optimizationLevel: 5}),
            imagemin.svgo({
                plugins: [
                    {removeViewBox: true},
                    {cleanupIDs: false}
                ]
            })
        ]))
        .pipe(gulp.dest('./dist/img/'))
});
gulp.task('watcher',['html', 'libs', 'sass'], function() {
    gulp.watch("./app/scss/*.scss", ['sass']);
    gulp.watch("./app/js/*.js", ['libs']);
    gulp.watch("./app/img/*", ['compress']);
    gulp.watch("./app/*.html", ['html']);
});
gulp.task('browser', function () {
    var files = [
        './**/*'
    ];
    browserSync.init( files,
        {
            injectChanges: true,
            server: "./dist",
            open: false,
            notify: false,
            port: 8080,
            watchOptions : {
                ignored : [
                    'node_modules/*'
                ],
                ignoreInitial : true
            }
        });
});
gulp.task('clean-dist', function () {
    return gulp.src('dist/', {read: false})
        .pipe(clean());
});
gulp.task('clean-img', function () {
    return gulp.src('dist/img', {read: false})
        .pipe(clean());
});
gulp.task('connect', function() {
    connect.server({
        port: 8080,
        hostname: 'localhost',
        base: './dist'
    });
});
gulp.task('server', ['browser','watcher']);
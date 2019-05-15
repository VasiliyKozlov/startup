var gulp = require('gulp'),
  postcss = require('gulp-postcss'),
  cssnano = require('cssnano'),
  autoprefixer = require('autoprefixer'),
  uglify = require('gulp-uglify'),
  concat = require('gulp-concat'),
  imagemin = require('gulp-imagemin'),
  sass = require('gulp-sass');

var path = {
  build: {
    js: 'build/js/',
    css: 'build/css/',
    img: 'build/images/'
  },
  src: {
    js: 'src/js/**/*.js',
    style: 'src/scss/*.scss',
    img: 'src/images/**/*.*'
  },
  watch: {
    js: 'src/js/**/*.js',
    style: 'src/scss/**/*.scss',
    img: 'src/images/**/*.*'
  }
};

var js = function() {
  return gulp
    .src(path.src.js)
    .pipe(uglify())
    .pipe(gulp.dest(path.build.js));
};

var style = function() {
  var plugins = [
    autoprefixer({
      browsers: [
        'last 2 versions',
        'ie >= 9',
        'safari 5',
        'opera 12.1',
        'ios 6',
        'android 4'
      ]
    }),
    cssnano()
  ];
  return gulp
    .src(path.src.style)
    .pipe(sass())
    .pipe(postcss(plugins))
    .pipe(concat('all.css'))
    .pipe(gulp.dest(path.build.css));
};

var image = function() {
  return gulp
    .src(path.src.img)
    .pipe(
      imagemin({
        progressive: true,
        svgoPlugins: [{ removeViewBox: false }],
        interlaced: true
      })
    )
    .pipe(gulp.dest(path.build.img));
};

var build = gulp.series(style, js, image);

// gulp.task("watch", function() {
//   watch([path.watch.style], function(event, cb) {
//     gulp.start("style:build");
//   });
//   watch([path.watch.js], function(event, cb) {
//     gulp.start("js:build");
//   });
//   watch([path.watch.img], function(event, cb) {
//     gulp.start("image:build");
//   });
// });

// gulp.task("default", ["build", "watch"]);
exports.build = build;

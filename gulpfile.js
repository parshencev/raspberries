var gulp            = require('gulp'),
    htmlmin         = require('gulp-htmlmin'),
    browserSync     = require('browser-sync').create(),
    less            = require('gulp-less'),
    cleanCSS        = require('gulp-clean-css'),
    LessAutoprefix  = require('less-plugin-autoprefix'),
    autoprefix      = new LessAutoprefix({ browsers: ['last 2 versions'] });
    path        = {
      img : "./src/img/*.png",
      less : "./src/less/*.less",
      html : "./src/*.html",
      css : "./src/css/*.css",
      css_min : "./build/css/",
      html_min : "./build/",
      img_min : "./build/img/",
      server : "./build/",
      watch_build : "./build/**/*"
    };

gulp.task('img', function() {
  return gulp.src(path.img)
    .pipe(gulp.dest(path.img_min));
});

gulp.task('less', function () {
  return gulp.src(path.less)
  .pipe(less({
    plugins: [autoprefix]
  }))
  .pipe(gulp.dest(path.css_min));
});

gulp.task('css', function() {
  return gulp.src(path.css)
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest(path.css_min));
});

gulp.task('html', function() {
  return gulp.src(path.html)
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest(path.html_min))
});

gulp.task('serve', function() {
    browserSync.init({
        server: path.server
    });

    gulp.watch(path.watch_build).on('change', browserSync.reload);
});

gulp.task('watch', function () {
  gulp.watch(path.less, ['less']);
  gulp.watch(path.html, ['html']);
});

gulp.task('default',['img','css','less','html','watch'], function() {
  gulp.run(['serve']);
});

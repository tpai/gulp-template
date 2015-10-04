var gulp = require("gulp"),
  connect = require("gulp-connect"),
  autoprefixer = require("gulp-autoprefixer"),
  concat = require("gulp-concat"),
  rename = require("gulp-rename"),
  uglify = require("gulp-uglify"),
  notify = require("gulp-notify"),

  jshint = require("gulp-jshint"),
  sass = require("gulp-sass"),
  minifyCSS = require("gulp-minify-css"),

  browserSync = require("browser-sync").create();


gulp.task("js", function() {
  return gulp.src("app/components/js/*.js")
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(concat("main.js"))
    .pipe(gulp.dest("app/components/build/"))
    .pipe(uglify())
    .pipe(rename(function(path) {
      path.basename += ".min";
      path.extname = ".js";
    }))
    .pipe(gulp.dest("app/pages/"))
    .pipe(notify("Scripts task done!"));
});

gulp.task("css", function() {
  return gulp.src("app/components/css/*.css")
    .pipe(concat("main.css"))
    .pipe(autoprefixer())
    .pipe(gulp.dest("app/components/build/"))
    .pipe(minifyCSS())
    .pipe(rename(function(path) {
      path.basename += ".min";
      path.extname = ".css";
    }))
    .pipe(gulp.dest("app/pages/"))
    .pipe(notify("Styles task done!"));
});

gulp.task("server", ["js", "css"], function() {
  browserSync.init({server: "app/pages/"});
  connect.server({livereoload: true, root: ["app/pages/"]})
});

gulp.task("watch", ["js", "css", "server"], function() {
  gulp.watch("app/components/js/*.js", ["js"]);
  gulp.watch("app/components/css/*.css", ["css"]);
  gulp.watch("app/pages/*.html").on("change", browserSync.reload);
  gulp.watch("app/pages/*.css").on("change", browserSync.reload);
  gulp.watch("app/pages/*.js").on("change", browserSync.reload);
});

gulp.task("default", ["js", "css", "server", "watch"]);

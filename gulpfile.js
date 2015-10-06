var gulp = require("gulp"),
  connect = require("gulp-connect"),
  autoprefixer = require("gulp-autoprefixer"),
  concat = require("gulp-concat"),
  rename = require("gulp-rename"),
  uglify = require("gulp-uglify"),
  notify = require("gulp-notify"),

  react = require("gulp-react"),
  jshint = require("gulp-jshint"),
  sass = require("gulp-sass"),
  minifyCSS = require("gulp-minify-css"),

  browserSync = require("browser-sync").create();


gulp.task("jsx", function() {
  return gulp.src("app/components/jsx/*.jsx")
    .pipe(react())
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(concat("main.jsx"))
    .pipe(gulp.dest("app/components/build/"))
    .pipe(uglify())
    .pipe(rename(function(path) {
      path.basename += ".min";
      path.extname = ".jsx";
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

gulp.task("server", ["jsx", "css"], function() {
  browserSync.init({server: "app/pages/"});
  connect.server({livereoload: true, root: ["app/pages/"]})
});

gulp.task("watch", ["jsx", "css", "server"], function() {
  gulp.watch("app/components/jsx/*.jsx", ["jsx"]);
  gulp.watch("app/components/css/*.css", ["css"]);
  gulp.watch("app/pages/*.html").on("change", browserSync.reload);
  gulp.watch("app/pages/*.css").on("change", browserSync.reload);
  gulp.watch("app/pages/*.jsx").on("change", browserSync.reload);
});

gulp.task("default", ["jsx", "css", "server", "watch"]);

var gulp = require("gulp"),
  webserver = require("gulp-webserver"),
  autoprefixer = require("gulp-autoprefixer"),
  concat = require("gulp-concat"),
  minifyCSS = require("gulp-minify-css"),
  rename = require("gulp-rename"),
  uglify = require("gulp-uglify"),
  htmlreplace = require("gulp-html-replace"),
  minifyHTML = require("gulp-minify-html");

gulp.task("js", function() {
  return gulp.src("app/components/js/*.js")
    .pipe(concat("main.js"))
    .pipe(gulp.dest("app/components/build/"))
    .pipe(uglify())
    .pipe(rename(function(path) {
      path.basename += ".min";
      path.extname = ".js";
    }))
    .pipe(gulp.dest("app/components/build/"));
});

gulp.task("css", function() {
  return gulp.src("app/components/css/*.css")
    .pipe(concat("main.css"))
    .pipe(autoprefixer())
    .pipe(gulp.dest("app/components/build/"))
    .pipe(minifyCSS()) //{ keepBreaks: true } 留換行
    .pipe(rename(function(path) {
      path.basename += ".min";
      path.extname = ".css";
    }))
    .pipe(gulp.dest("app/components/build/"));
});

gulp.task("html", function() {
  var opts = {comments: false, spare: false, quotes: true};
  return gulp.src("app/pages/index.html")
    .pipe(htmlreplace({
      "css": "/components/build/main.min.css",
      "js": "/components/build/main.min.js"
    }))
    .pipe(minifyHTML(opts))
    .pipe(rename(function(path) {
      path.basename += ".min";
      path.extname = ".html";
    }))
    .pipe(gulp.dest("app/pages/"));
})

gulp.task("web", function() {
  gulp.src("app/")
  .pipe(webserver({
    port: 8008,
    livereload: true,
    directoryListing: false,
    open: true,
    fallback: "pages/index.min.html"
  }));
});

gulp.task("default", ["js", "css", "html"]);

const { src, dest, watch, parallel, series } = require("gulp");

const sass = require("gulp-sass")(require("sass"));
const concat = require("gulp-concat");
const browserSync = require("browser-sync").create();
const uglify = require("gulp-uglify-es").default;
const autoprefixer = require("gulp-autoprefixer");
const imagemin = require("gulp-imagemin");
const htmlmin = require("gulp-htmlmin");
const del = require("del");

const browsersync = () => {
  browserSync.init({
    server: {
      baseDir: "app/",
    },
  });
};

const html = () => {
  return src("app/*.html")
    .pipe(
      htmlmin({
        collapseWhitespace: true,
      })
    )
    .pipe(dest("dist"));
};

const cleanDist = () => {
  return del("dist");
};

const images = () => {
  return src("app/images/**/*")
    .pipe(
      imagemin([
        imagemin.gifsicle({ interlaced: true }),
        imagemin.mozjpeg({ quality: 75, progressive: true }),
        imagemin.optipng({ optimizationLevel: 5 }),
        imagemin.svgo({
          plugins: [{ removeViewBox: true }, { cleanupIDs: false }],
        }),
      ])
    )
    .pipe(dest("dist/images"));
};

const scripts = () => {
  return src(["node_modules/jquery/dist/jquery.js", "app/js/main.js"])
    .pipe(concat("main.min.js"))
    .pipe(uglify())
    .pipe(dest("app/js"))
    .pipe(browserSync.stream());
};

const scss = () => {
  return src("app/scss/style.scss")
    .pipe(sass({ outputStyle: "compressed" }))
    .pipe(concat("style.min.css"))
    .pipe(
      autoprefixer({
        overrideBrowserslist: ["last 10 version"],
        grid: true,
      })
    )
    .pipe(dest("app/css"))
    .pipe(browserSync.stream());
};

const build = () => {
  return src(
    [
      "app/css/style.min.css",
      "app/fonts/**/*",
      "app/js/main.min.js",
      // "app/*.html",
    ],
    { base: "app" }
  ).pipe(dest("dist"));
};

const watching = () => {
  watch(["app/scss/**/*.scss"], scss);
  watch(["app/js/**/*.js", "!app/js/main.min.js"], scripts);
  watch(["app/*.html"]).on("change", browserSync.reload);
};

exports.html = html;
exports.scss = scss;
exports.watching = watching;
exports.browsersync = browsersync;
exports.scripts = scripts;
exports.images = images;
exports.cleanDist = cleanDist;

exports.build = series(cleanDist, images, html, scss, build);
exports.default = parallel(scss, scripts, browsersync, watching);

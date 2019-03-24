const gulp = require('gulp');
const pump = require('pump');
const rename = require('gulp-rename');
const browsersync = require('browser-sync').create();
const htmlhint = require('gulp-htmlhint');
const prettier = require('gulp-prettier');
const htmlmin = require('gulp-htmlmin');
const sourcemaps = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');
const eslint = require('gulp-eslint');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');

const files = {
  dist: '.',
  html: 'src/index.html',
  css: 'src/style.css',
  js: 'src/app.js',
};
const intoDist = () => gulp.dest(files.dist);

gulp.task('test', (cb) => {
  console.log('Test is a success!');
  cb();
});


gulp.task('browser-sync', () => {
  browsersync.init({
    server: {
      injectChanges: true,
      baseDir: `${files.dist}/`,
    },
  });
});

/* HTML TASKS */

gulp.task('html-lint', cb => pump(
  [
    gulp.src(files.html),
    htmlhint('htmlhintrc.json'),
    htmlhint.reporter(),
    prettier.check(),
  ],
  cb,
));
gulp.task('html-min', cb => pump(
  [
    gulp.src(files.html), htmlmin({
      collapseBooleanAttributes: true,
      collapseWhitespace: true,
      keepClosingSlash: true,
      minifyURLs: true,
      preventAttributesEscaping: true,
      removeAttributeQuotes: true,
      removeComments: true,
      removeEmptyAttributes: true,
      removeRedundantAttributes: true,
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true,
      sortAttributes: true,
      sortClassName: true,
      trimCustomFragments: true,
      useShortDoctype: true,
    }),
    intoDist(),
  ],
  cb,
));
gulp.task('html-reload', (cb) => {
  browsersync.reload(`${files.dist}/index.html`);
  cb();
});
gulp.task('html', cb => gulp.series('html-lint', 'html-min', 'html-reload')(cb));
gulp.task('html-watch', () => gulp.watch(files.html, gulp.series('html')));

/* CSS TASK */

gulp.task('css', cb => pump(
  [
    gulp.src(files.css),
    sourcemaps.init(),
    postcss(),
    rename({
      extname: '.min.css',
    }),
    sourcemaps.write(`${files.dist}/sourcemaps`),
    intoDist(),
    browsersync.reload({ stream: true }),
  ],
  cb,
));

gulp.task('css-watch', () => gulp.watch(files.css, gulp.series('css')));

/* JS TASKS */

gulp.task('js-lint', cb => pump(
  [
    gulp.src(files.js),
    eslint(),
    eslint.format(),
    eslint.failAfterError(),
  ],
  cb,
));

gulp.task('js-build', cb => pump(
  [
    gulp.src(files.js),
    sourcemaps.init(),
    babel(),
    uglify({
      compress: true,
      mangle: {
        toplevel: true,
        eval: true,
      },
    }),
    rename({
      extname: '.min.js',
    }),
    sourcemaps.write(`${files.dist}/sourcemaps`),
    intoDist(),
  ],
  cb,
));

gulp.task('js-reload', (cb) => {
  browsersync.reload(`${files.dist}/app.min.js`);
  cb();
});


gulp.task('js', cb => gulp.series('js-lint', 'js-build', 'js-reload')(cb));
gulp.task('js-watch', () => gulp.watch(files.js, gulp.series('js')));


/* !!! DEFAULT TASK !!! */
gulp.task('default', (cb) => {
  gulp.parallel('browser-sync', 'html-watch', 'css-watch', 'js-watch')(cb);
});

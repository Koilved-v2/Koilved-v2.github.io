const config = require('./configs/main.config');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const csso = require('gulp-csso');
const gcmq = require('gulp-group-css-media-queries');
const sass = require('gulp-sass');

module.exports = (gulp, plugins, config) => {
  return () => {
    let pipeline = gulp.src(`${config.paths.indexStyle}`)
      .pipe(plumber({
        errorHandler: notify.onError((err) => {
          return {
            title:   'Hey man, error occured in your Styles, let\'s repair it',
            message: err.message
          }
        })
      }));

    if (config.isDevelopment) {
      pipeline = pipeline
        .pipe(plugins.sourcemaps.init());
    }

    pipeline = pipeline
      .pipe(plugins[`${config.preprocessor}`]())
      .pipe(plugins.postcss(config.postcssConfig))
      .pipe(plugins.cssimport());

    if (!config.isDevelopment) {
      pipeline = pipeline
        .pipe(gcmq())
        .pipe(csso());
    }
    pipeline = pipeline
      .pipe(plugins.sourcemaps.write())
      .pipe(plugins.concat('style.css'));

    pipeline.pipe(gulp.dest(`./index_files/new-version/${config.output.css}/`));

    return pipeline.pipe(gulp.dest(`${config.paths.dist}/${config.output.css}/`));
  }
};

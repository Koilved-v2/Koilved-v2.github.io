const pug = require('gulp-pug');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const gulpif = require('gulp-if');
const cached = require('gulp-cached');
const emitty = require('emitty').setup('pug', 'pug');

const onError = notify.onError('Line: <%= error.lineNumber %>: <%= error.message %>\n<%= error.fileName %> title: <%= error.plugin %>');

module.exports = (gulp, plugins, config) => {
    return () => {
        let pipeline = gulp.src([`${config.paths.pug}`, `${config.paths._pugFolder}`])
            .pipe(plumber({
                errorHandler: onError
            }))
            //.pipe(cached('pug'))
            .pipe(gulpif(global.watch, emitty.stream()))
            .pipe(pug({
                pretty: true
            }))
            .pipe(plumber.stop());

        return pipeline.pipe(gulp.dest(`${config.paths.dist}`));
    }
};

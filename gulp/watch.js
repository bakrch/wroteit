const Gulp = require('gulp');
const Eslint = require('gulp-eslint');

const internals = {};
internals.lintFile = (file) => {

    Gulp.src(file)
        .pipe(Eslint())
        .pipe(Eslint.format());
};


Gulp.task('watch', () => {

    global.isWatching = true;
    Gulp.watch(['./client/**/*.less', './client/**/*.config'], ['less']);
    Gulp.watch('./client/media/**/*', ['media']);
    Gulp.watch(['**/*.js', '**/*.jsx', '!node_modules/**', '!gulp/**', '!public/**', '!test/**'], (ev) => {

        console.log(ev);  // eslint-disable-line no-console
        if (ev.type === 'added' || ev.type === 'changed') {
            internals.lintFile(ev.path);
        }
    });
});

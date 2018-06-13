const Gulp = require('gulp');
const Eslint = require('gulp-eslint');


Gulp.task('lint', () => {

    return Gulp.src(['**/*.js', '**/*.jsx','!node_modules/**', '!public/**', '!ignore/**'])
        .pipe(Eslint())
        .pipe(Eslint.format());
    //.pipe(Eslint.failAfterError());
});

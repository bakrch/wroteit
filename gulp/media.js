const Gulp = require('gulp');
const Path = require('path');
const Merge = require('merge-stream');

const { lstatSync, readdirSync } = require('fs');
const { join } = require('path');

const isDirectory = (source) => lstatSync(source).isDirectory();
const getDirectories = (source) => readdirSync(source).map((name) => join(source, name)).filter(isDirectory);


Gulp.task('media', () => {

    const merged = Merge();

    merged.add(Gulp.src('./client/media/**/*')
        .pipe(Gulp.dest(Path.join('./public', 'media'))));

    getDirectories('./node_modules/semantic-ui-less/themes/').forEach((path) => {

        return merged.add(Gulp.src(path + '/assets/**')
            .pipe(Gulp.dest(Path.join('./public', 'media', 'semantic-ui', path.split('/').pop()))));
    });

    return merged;
});

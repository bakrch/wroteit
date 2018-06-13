const Gulp = require('gulp');
const Nodemon = require('gulp-nodemon');


Gulp.task('nodemon', () => {

    const nodeArgs = ['--inspect'];

    if (process.env.DEBUGGER) {
        nodeArgs.push('--debug');
    }

    const config = {
        script: 'server.js',
        ext: 'js md',
        ignore: [
            'client/**/*',
            'gulp/**/*',
            'public/**/*',
            'test/**/*',
            'node_modules/**/*'
        ],
        nodeArgs
    };

    Nodemon(config).on('restart', (files) => {

        console.log('change detected:', files);  // eslint-disable-line no-console
    });
});

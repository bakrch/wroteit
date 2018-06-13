const Gulp = require('gulp');
const Dotenv = require('dotenv');

Dotenv.config();


Gulp.task('build', ['lint', 'less', 'webpack', 'media']);

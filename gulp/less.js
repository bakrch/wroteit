const Gulp = require('gulp');
const Concat = require('gulp-concat');
const Less = require('gulp-less');
const Cssmin = require('gulp-cssmin');
const Sourcemaps = require('gulp-sourcemaps');



Gulp.task('less', () => {

    const bundleConfigs = [{
        entries: [
            './client/core/semantic.less'
            // './client/core/font-awesome.scss'
        ],
        dest: './public',
        outputName: 'core.min.css'
    },
    {
        entries: './client/pages/landing/index.less',
        dest: './public/pages',
        outputName: 'landing.min.css'
    },
    {
        entries: './client/pages/home/index.less',
        dest: './public/pages',
        outputName: 'home.min.css'
    },
    {
        entries: './client/pages/admin/index.less',
        dest: './public/pages',
        outputName: 'admin.min.css'
    }];

    return bundleConfigs.map((bundleConfig) => {

        return Gulp.src(bundleConfig.entries)
            .pipe(Concat(bundleConfig.outputName))
            .pipe(Sourcemaps.init())
            .pipe(Less({ paths: ['client/theme/semantic/ui'] }))
            .pipe(Cssmin())
            .pipe(Sourcemaps.write())
            .pipe(Gulp.dest(bundleConfig.dest));
    });
});

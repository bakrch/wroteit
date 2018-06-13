const Gulp = require('gulp');
const Gutil = require('gulp-util');
const Path = require('path');
const Webpack = require('webpack');
// const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;



let executionCount = 0;

Gulp.task('webpack', (callback) => {

    const plugins = [
        new Webpack.optimize.CommonsChunkPlugin({ name: 'core', filename: '../core.min.js', minSize: 2 }),
        new Webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': `"${process.env.NODE_ENV}"`
            }
        })
        // new LodashModuleReplacementPlugin()
    ];
    if (process.env.ANALYZE_ENV) {
        plugins.push(new BundleAnalyzerPlugin());
    }

    let devtool = 'source-map';

    if (process.env.NODE_ENV === 'production') {
        plugins.push(new Webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }));

        devtool = 'cheap-module-source-map';
    }

    const config = {
        watch: global.isWatching,
        entry: {
            landing: './client/pages/landing/index',
            home: './client/pages/home/index'
        },
        output: {
            path: Path.resolve(__dirname, '../public/pages'),
            filename: '[name].min.js'
        },
        resolve: {
            extensions: ['.js', '.jsx'],
            alias: {
                Client: Path.resolve(__dirname, '../client'),
                Landing: Path.resolve(__dirname, '../client/pages/landing'),
                Home: Path.resolve(__dirname, '../client/pages/home')
            }
        },
        module: {
            rules: [
                /*{
                    enforce: 'pre',
                    test: /(?:\.jsx|\.js)$/,
                    include: [Path.resolve(__dirname, '../client')],
                    loader: 'eslint-loader'
                },*/
                {
                    test: /\.css$/,
                    use: ['style-loader', 'css-loader']
                },
                {
                    test: /\.jsx?$/,
                    include: [Path.resolve(__dirname, '../client')],
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                ['@babel/preset-env', {
                                    'targets': {
                                        'browsers': 'Chrome >= 58'
                                    }
                                    // 'useBuiltIns': 'usage'
                                }],
                                '@babel/react'
                            ],
                            plugins: [
                                'transform-class-properties',
                                '@babel/plugin-proposal-object-rest-spread',
                                '@babel/plugin-proposal-export-default-from',
                                ['lodash', { 'id': ['lodash', 'semantic-ui-react'] }]
                            ]
                        }
                    }
                }
            ]
        },
        devtool,
        plugins
    };

    Webpack(config, (err, stats) => {

        if (err) {
            throw new Gutil.PluginError('webpack', err);
        }

        Gutil.log('[webpack]', stats.toString({ colors: true, chunkModules: false }));

        if (executionCount === 0) {
            callback();
        }

        executionCount += 1;
    });
});

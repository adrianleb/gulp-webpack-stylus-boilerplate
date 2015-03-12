var gulp = require("gulp");
var gutil = require("gulp-util");
var webpack = require("webpack");
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');

var WebpackDevServer = require("webpack-dev-server");
var webpackConfig = require("./webpack.config.js");
var webpackProductionConfig = require("./webpack.config.production.js");
require('laravel-elixir-imagemin');



// The development server (the recommended option for development)
gulp.task("default", ["webpack-dev-server", "build-images"], function(){
    gulp.watch(["resources/assets/img/*"], ["build-images"]);

});

// Build and watch cycle (another option for development)
// Advantage: No server required, can run app from filesystem
// Disadvantage: Requests are not blocked until bundle is available,
//               can serve an old app on refresh
gulp.task("build-dev", ["webpack:build-dev"], function() {
    gulp.watch(["src/assets/js/*"], ["webpack:build-dev"]);
    gulp.watch(["src/assets/css/*"], ["webpack:build-dev"]);
    gulp.watch(["src/assets/img/*"], ["build-images"]);

});



// Production build
gulp.task("build", ["webpack:build", "build-images"]);



gulp.task('build-images', function(callback) {
    return gulp.src('./src/assets/img/**/*')
    .pipe(imagemin({
        progressive: true,
        svgoPlugins: [{removeViewBox: false}],
        use: [pngquant()]
    }))
    .pipe(gulp.dest('./dist/assets/img'));
    // body...
})
gulp.task("webpack:build", function(callback) {
    // modify some webpack config options
    var myConfig = Object.create(webpackProductionConfig);

    // run webpack
    webpack(myConfig, function(err, stats) {
        if(err) throw new gutil.PluginError("webpack:build", err);
        gutil.log("[webpack:build]", stats.toString({
            colors: true
        }));
        callback();
    });
});

var myDevConfig = Object.create(webpackConfig);
myDevConfig.devtool = "sourcemap";
myDevConfig.debug = true;

var devCompiler = webpack(myDevConfig);

gulp.task("webpack:build-dev", function(callback) {
    devCompiler.run(function(err, stats) {
        if(err) throw new gutil.PluginError("webpack:build-dev", err);
        gutil.log("[webpack:build-dev]", stats.toString({
            colors: true
        }));
        callback();
    });
});

gulp.task("webpack-dev-server", function(callback) {
    var myConfig = Object.create(webpackConfig);
    myConfig.devtool = "eval";
    myConfig.debug = true;
    new WebpackDevServer(webpack(myConfig), {
        contentBase: "./dist/" ,
        publicPath: "/assets/",
        hot: true,
        quiet: false,
        noInfo: false,
        historyApiFallback: true,
        inline:true,
        stats: {
            colors: true
        }
    }).listen(8080, "localhost", function(err) {
        if(err) throw new gutil.PluginError("webpack-dev-server", err);
        gutil.log("[webpack-dev-server]", "http://localhost:8080/webpack-dev-server/index.html");
        callback();
    });
});
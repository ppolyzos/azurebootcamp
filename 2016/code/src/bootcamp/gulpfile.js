/// <binding />
"use strict";

var gulp = require("gulp"),
    rimraf = require("rimraf"),
    concat = require("gulp-concat"),
    cssmin = require("gulp-cssmin"),
    uglify = require("gulp-uglify");

var paths = {
    webroot: "./wwwroot/"
};

paths.js = paths.webroot + "js/**/*.js";
paths.minJs = paths.webroot + "js/**/*.min.js";
paths.css = paths.webroot + "css/**/*.css";
paths.minCss = paths.webroot + "css/**/*.min.css";
paths.concatJsDest = paths.webroot + "js/site.min.js";
paths.concatCssDest = paths.webroot + "css/site.min.css";

gulp.task("clean:js", function (cb) {
    rimraf(paths.concatJsDest, cb);
});

gulp.task("clean:css", function (cb) {
    rimraf(paths.concatCssDest, cb);
});

gulp.task("clean", ["clean:js", "clean:css"]);

gulp.task("min:js", function () {
    return gulp.src([
        
        paths.webroot + "js/slick.min.js",
        paths.webroot + "js/placeholdem.min.js",
        paths.webroot + "js/rs-plugin/js/jquery.themepunch.plugins.min.js",
        paths.webroot + "js/rs-plugin/js/jquery.themepunch.revolution.min.js",
        paths.webroot + "js/waypoints.min.js",
        paths.webroot + "js/TimeCircles.js",
        paths.webroot + "js/site.js",
        paths.webroot + "js/custom.js",
        paths.webroot + "js/google.js"
        //paths.js,
        //"!" + paths.webroot + "js/site.min.js"
    ], { base: "." })
        .pipe(concat(paths.concatJsDest))
        .pipe(uglify())
        .pipe(gulp.dest("."));
});

gulp.task("min:css", function () {
    return gulp.src([
            paths.webroot + "css/animate.css",
            paths.webroot + "css/slick.css",
            paths.webroot + "js/rs-plugin/css/settings.css",
            paths.webroot + "css/site.css",
            paths.webroot + "css/custom.css",
            paths.webroot + "css/TimeCircles.css",
           // paths.css,
           // "!" + paths.minCss
        ])
        .pipe(concat(paths.concatCssDest))
        .pipe(cssmin())
        .pipe(gulp.dest("."));
});

gulp.task("min", ["min:js", "min:css"]);

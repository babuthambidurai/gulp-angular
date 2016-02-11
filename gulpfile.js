var gulp = require('gulp');
var source = require('vinyl-source-stream');
var streamify = require('gulp-streamify');
var babelify = require("babelify");
var connect = require('gulp-connect');
var uglify = require('gulp-uglify');
var browserify = require('browserify');
var ngAnnotate = require('gulp-ng-annotate');

var paths = {
  js: ['src/app.js']
};



gulp.task('build', function() {
    return browserify(paths.js)
    	.transform(babelify, {
    		presets: ["es2015"]
    	})
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(streamify(uglify()))
        .pipe(gulp.dest('./build/'));
});

gulp.task('connect', function() {
  connect.server({
    port: 3000,
    livereload: true
  });
});

gulp.task('serve', function() {
  connect.server({
    port: 3100,
    livereload: false
  });
});

// Rerun the task when a file changes
gulp.task('watch', function() {
  gulp.watch('src/**/*.js', ['build']);
});
 
gulp.task('default', ['build', 'watch', 'connect']);
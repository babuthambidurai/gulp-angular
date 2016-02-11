var gulp = require('./gulp');
var source = require('vinyl-source-stream');
var streamify = require('gulp-streamify');
var babelify = require("babelify");
var connect = require('gulp-connect');
var uglify = require('gulp-uglify');

var paths = {
  js: ['src/**/*.js']
};



gulp.task('build', function() {
    return browserify(paths.js)
    	.transform(babelify, {
    		presets: ["es2015"]
    	})
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(streamify(uglify())
        .pipe(gulp.dest('./build/bundle.js'));
});

gulp.task('serve', function() {
  connect.server({
    port: 3000,
    livereload: true
  });
});

// Rerun the task when a file changes
gulp.task('watch', function() {
  gulp.watch(paths.scripts, ['browserify']);
});
 
gulp.task('default', ['build', 'watch', 'serve']);
var gulp = require('gulp');
var sass = require('gulp-sass');
var connect = require('gulp-connect');

gulp.task('sass', function () {
	gulp.src('./app/scss/*.scss')
		.pipe(sass({ 
			errLogToConsole: true,
			outputStyle: 'nested'
		}))
		.pipe(gulp.dest('./app/css'))
		.pipe(connect.reload());
});

gulp.task('connectDev', function () {
	connect.server({
		root: ['app'],
		port: 8080,
		livereload: true
	});
});

gulp.task('html', function () {
  gulp.src('./app/*.html')
    .pipe(connect.reload());
});

gulp.task('js', function() {
	gulp.src('./app/js/*.js')
	.pipe(connect.reload());
});

gulp.task('watch', function() {
	gulp.watch(['./app/*.html', './app/templates/*.html.hbs'], ['html']);
    gulp.watch(['./app/scss/*.scss', './app/scss/cinder/*.scss', './app/scss/cinder/ui/*.scss'], ['sass']);
    gulp.watch(['./app/js/**/*.js'], ['js']);
});


gulp.task('default', ['connectDev', 'watch']);

import gulp from 'gulp';
import gulpSass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import gulpPurgeCSS from 'gulp-purgecss';
import dartSass from 'sass';
const sass = gulpSass(dartSass);

export function buildStyles() {
	return gulp
		.src('./src/styles/scss/**/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(
			autoprefixer({
				overrideBrowserslist: ['last 2 versions'],
				cascade: false,
			})
		)
		.pipe(
			gulpPurgeCSS({
				content: ['./src/**/*.jsx'],
			})
		)
		.pipe(gulp.dest('./src/styles/css'));
}

export function watchTask() {
	gulp.watch(['./src/styles/scss/**/*.scss', './src/**/*.jsx'], buildStyles);
}

gulp.task('default', gulp.series(buildStyles, watchTask));

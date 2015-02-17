

var gulp = require('gulp');
var imageResize = require('gulp-image-resize');
var ejs = require('gulp-ejs');
var fs = require('fs');


gulp.task('crop', function() {
	return gulp.src(['public/img/gallery/*.jpg'])
		.pipe(imageResize({
			width: 300,
			height: 300,
			crop: true,
			upscale: false
		}))
		.pipe(gulp.dest('public/img/gallery/thumbnail/'));
});


gulp.task('template', function() {
	var images = [];
	var imageData = [];
	var imageFiles = fs.readdirSync('./public/img/gallery/');
	
	var ROW_LIMIT = 6;
	var rowCount = 0;
	var rowCursor = 0;

	for (var i = imageFiles.length - 1; i >= 0; i--) {
		if (imageFiles[i].indexOf('.jpg') !== -1) {
			images.push({
				image: 'img/gallery/' + imageFiles[i],
				thumbnail: 'img/gallery/thumbnail/' + imageFiles[i]
			});
		}
	}

	console.log(images);

	for (var j = images.length - 1; j >= 0; j--) {
		if (!imageData[rowCursor]) {
			imageData[rowCursor] = [];
		}

		imageData[rowCursor].push(images[j]);

		rowCount++;
		
		if (rowCount === ROW_LIMIT) {
			rowCount = 0;
			rowCursor++;
		}
	}

	console.log(imageData);

	return gulp.src(['templates/gallery.ejs'])
		.pipe(ejs({
        images: imageData
    }))
    .pipe(gulp.dest('templates'));
});

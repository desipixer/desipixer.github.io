//misc.js


// Downloads individual images - uses Filesaver.js plugin to download
var imagesDownload = function (url) {
	var img = new Image();
	img.setAttribute('crossOrigin', 'anonymous');
	img.onload = function () {
		var canvas = document.createElement("canvas");
		canvas.width = this.width;
		canvas.height = this.height;
		var ctx = canvas.getContext("2d");
		ctx.drawImage(this, 0, 0);
		canvas.toBlob(function (blob) {
			var filename = url.match(/^.*?([^\\/.]*)[^\\/]*$/)[1];
			saveAs(blob, filename);
		})
	}

	img.src = url;
	return img;
}
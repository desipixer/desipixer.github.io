

module.exports = function (grunt) {
	grunt.initConfig({
		concat: {
			extras: {
				src: [
					'lib/js/angular.min.js',
					'lib/js/angular-route.min.js',
					'lib/js/jquery-1.11.1.min.js',
					'lib/js/lightbox.min.js',
					'lib/js/bootstrap.min.js'
				],
				dest: 'Scripts/vendor/vendor.js'
			},
			basic : {
				src : [
					'Scripts/app.js',
					'Scripts/service.data.js',
					'Scripts/service.js',
					'Scripts/controller.js',
					'Scripts/misc.js'
				],
				dest : 'Scripts/main/main.js'
			}

		},
		watch: {
			files: ['app/**/*.js', 'app/**/*'],
			tasks: ['concat']
		}
	});

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', ['concat']);

};	
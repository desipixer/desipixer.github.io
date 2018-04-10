

module.exports = function (grunt) {
	grunt.initConfig({
		concat: {
			extras: {
				src: [
					'lib/js/angular.min.js',
					'lib/js/angular-route.min.js',
					'lib/js/jquery-1.11.1.min.js',
					'lib/js/bootstrap.min.js',
					'lib/js/axios.min.js',
					'lib/js/lightbox.min.js'
				],
				dest: 'Scripts/vendor/vendor.js'
			},
			basic : {
				src : [
					'Scripts/app.js',
					'Scripts/services/service.data.js',
					'Scripts/services/service.login.js',
					'Scripts/services/service.auth.js',
					'Scripts/services/service.post.js',
					'Scripts/services/service.js',
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


module.exports = function (grunt) {
	grunt.initConfig({
		concat: {
			basic: {
				src: [
					'app/scripts/app.js',
					'app/scripts/service.main.js',
					'app/scripts/settings.js',
					'app/scripts/globals.js',
					'app/scripts/service.auth.js',
					'app/scripts/service.url.js',
					'app/scripts/service.util.js',
					'app/scripts/service.sites.js',
					'app/scripts/service.post.js',
					'app/scripts/service.copy.js',
					'app/scripts/directive.enter.js',
					'app/scripts/controller.main.js',
					'app/scripts/controller.home.js',
					'app/scripts/controller.wp.js',
					'app/scripts/controller.images.js'
				],
				dest: 'dist/js/scripts.js'
			},
			extras: {
				src: [
					'app/lib/js/angular.min.js',
					'app/lib/js/angular-ui-router.min.js',
					'app/lib/js/underscore-min.js',
					'app/lib/js/clipboard.min.js',
					'app/lib/js/jquery-3.1.1.min.js',
					'app/lib/js/icaro.js'
				],
				dest: 'dist/scripts/vendor.js'
			}

		},
		watch: {
			files: ['app/**/*.js', 'app/**/*'],
			tasks: ['concat', 'copy']
		},
		copy: {
			main: {
				files: [
					{
						src: ["app/index.html"],
						dest: "dist/index.html",
						isFile: true
					},
					{
						src: ["css/*", "lib/fonts/*", "lib/css/*", "data/*"],
						dest: "dist/",
						cwd: 'app/',
						expand: true
					},
					{
						expand: true,
						src: ["pages/*"],
						dest: "dist",
						cwd: 'app/'
					}
				]
			}
		}
	})

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', ['concat', 'copy']);

};	
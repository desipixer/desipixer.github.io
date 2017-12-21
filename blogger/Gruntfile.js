

module.exports = function (grunt) {


	grunt.initConfig({
		concat: {
			basic: {
				src: [
					'app/scripts/app.js',
					'app/scripts/service.auth.js',
					'app/scripts/service.util.js',
					'app/scripts/controller.main.js'
				],
				dest: 'dist/js/scripts.js'
			},
			extras: {
				src: [
					'app/lib/js/angular.min.js',
					'app/lib/js/axios.min.js',
					'app/lib/js/q.js',
					'app/lib/js/underscore-min.js',
					'app/lib/js/jquery-3.1.1.min.js',
					'app/lib/js/superagent.js',
					'app/lib/js/superagent-jsonp.js',
					'app/lib/js/vkbeautify.0.99.00.beta.js'
				],	 
				dest: 'dist/scripts/vendor.js'
			}

		},
		watch: {
			files: ['app/**/*.js', 'app/**/*'],
			tasks: ['concat', 'copy']
		},
		uglify: {
			options: {
				mangle: true
			},
			target: {
				files: {
					'dist/scripts/scripts.min.js': ['dist/js/scripts.js']
				}
			}
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
						src: ["css/*", "lib/css/*", "data/*"],
						dest: "dist/",
						cwd: 'app/',
						expand: true
					},
					{
						expand: true,
						src: ["pages/*"],
						dest: "dist",
						cwd: 'app/'
					},
					{
						expand: true,
						src: ["files/*", "config/*"],
						dest: "dist",
						cwd: 'app/'
					}
				]
			}
		}
	})

	grunt.loadNpmTasks('grunt-contrib-concat');
	//grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', ['concat', 'copy']);

};	
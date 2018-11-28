module.exports = function(grunt) {
	var gc = {
		fontVers: '1.0.0',
		tasks: [
			'notify:watch',
			'less',
			'pug',
			'notify:done'
		]
	};
	require('load-grunt-tasks')(grunt);
	require('time-grunt')(grunt);
	grunt.initConfig({
		globalConfig : gc,
		pkg : grunt.file.readJSON('package.json'),
		less: {
			css: {
				options : {
					compress: false,
					ieCompat: false
				},
				files : {
					'dist/css/ubuntu.css' : [
						'src/less/ubuntu.less'
					],
					'test/css/main.css' : [
						'src/less/main.less'
					]
				}
			}
		},
		pug: {
			files: {
				options: {
					pretty: '\t',
					separator:  '\n'
				},
				files: {
					"index.html": ['src/pug/index.pug']
				}
			}
		},
		notify: {
			watch: {
				options: {
					title: "<%= pkg.name %> v<%= pkg.version %>",
					message: 'Запуск',
					image: __dirname+'\\src\\notify.png'
				}
			},
			done: {
				options: { 
					title: "<%= pkg.name %> v<%= pkg.version %>",
					message: "Успешно Завершено",
					image: __dirname+'\\src\\notify.png'
				}
			}
		},
		watch: {
			options: {
				livereload: true,
			},
			compile: {
				files: [
					'src/**/*.*'
				],
				tasks: gc.tasks
			}
		}
	});
	grunt.registerTask('dev',		['watch']);
	grunt.registerTask('default',	gc.tasks);
}
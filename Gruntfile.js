module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

		imagemin: {
		    dynamic: {
		        files: [{
		            expand: true,
		            cwd: 'app/img/',
		            src: ['**/*.{png,jpg,gif}'],
		            dest: 'prod/img/'
		        }]
		    }
		},

		less: {
		  development: {
		    options: {
		      livereload : true,
		      compress: true,
	          yuicompress: true,
	          optimization: 2
		    },
		    files: {
		      "app/css/result.css" : ["app/css/less/main.less"]
		    }
		  }
		},

  		 htmlmin: {                                     // Task
    		dist: {                                      // Target
     			 options: {                                 // Target options
        			removeComments: true,
        			collapseWhitespace: true
      			},
      			files: {                                   // Dictionary of files
        			'prod/index.html': 'app/index.html'    // 'destination': 'source'
      			}
    		}
    	},

		cssmin: {
		  my_target: {

		    files: [{
		      expand: true,
		      cwd: 'app/css/',
		      src: ['result.css'],
		      dest: 'app/css/',
		      ext: '.min.css'
		    }]
		  }
		},

		concat: {
		    options: {
		    },
		    prodcss: {
			    src: 'app/css/*.min.css',
			    dest: 'prod/css/result.css'
			}, 

			css: {
			    src: 'app/css/*.min.css',
			    dest: 'app/css/result.css'
			}, 
		},

		watch: {
			html: {
				files: ['app/*.html'],
				tasks: ['htmlmin']
			},
		    //scripts: {
		    //    files: ['app/js/*.js']   //'app/js/cont/*.js','app/js/libs/*.js','app/js/class/*.js','app/js/views/*.js' 
		    //    tasks: ['requirejs'],
		    //},
		    styles: {
		        files: ['app/css/less/*.less'], // which files to watch
		        tasks: ['less','cssmin','concat']
		    }
		}

	});
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-contrib-htmlmin');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-concat');

	
	grunt.registerTask('default', ['htmlmin', 'less', 'cssmin', 'concat', 'imagemin', 'watch' ]);
};
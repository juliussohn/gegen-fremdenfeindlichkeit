module.exports = function (grunt) {
require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    sass: {
        options: {
            sourceMap: true
        },
        dist: {
            files: {
                'css/app.css': 'sass/main.scss'
            }
        }
    },
     watch: {
            grunt: {
                files: ['Gruntfile.js']
            },
            sass: {
                files: 'sass/**/*.scss',
                tasks: ['sass'],
              
            }
            
        },

  });
  grunt.registerTask('default', ['sass']);


};




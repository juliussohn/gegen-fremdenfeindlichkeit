module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt);
    grunt.initConfig({
        autoprefixer: {
            dist: {
                files: [{
                    'css/app.min.css': 'css/app.css',
                }]
            }
        },
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
                tasks: ['sass', 'autoprefixer'],
            }
        },
    });
    grunt.registerTask('default', ['sass', 'autoprefixer']);
};
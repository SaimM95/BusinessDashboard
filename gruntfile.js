module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    jade: {
      compile: {
        options: {
          pretty: true,
          data: grunt.file.readJSON('data.json')
        },
        files: {
          'public/index.html': './index.jade',
          'public/dashboard.html': './dashboard.jade'
        }
      }
    },
    sass: {
      dist: {
        files: {
          'public/stylesheets/style.css' : 'public/stylesheets/style.scss'
        }
      }
    },
    watch: {
      grunt: { files: ['gruntfile.js'] },
      jade: {
        files: ['./*.jade', 'public/javascripts/*.js', 'public/stylesheets/*.css'],
        tasks: ['jade']
      },
      css: {
        files: '**/*.scss',
        tasks: ['sass']
      }
    }
  });
  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task.
  grunt.registerTask('build', 'Convert Jade templates into html templates', ['jade']);

  grunt.registerTask('default','Convert Jade templates into html templates',
                  ['jade','sass','watch']);
};
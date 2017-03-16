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
          'public/index.html': './index.jade'
        }
      }
    },
    watch: {
      grunt: { files: ['gruntfile.js'] },
      jade: {
        files: ['./*.jade', 'public/javascripts/*.js', 'public/stylesheets/*.css'],
        tasks: ['jade']
      }
    }
  });
  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jade');
  // Default task.
  grunt.registerTask('build', 'Convert Jade templates into html templates', ['jade']);

  grunt.registerTask('default','Convert Jade templates into html templates',
                  ['jade','watch']);
  grunt.loadNpmTasks('grunt-contrib-watch');
};
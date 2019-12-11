module.exports = function(grunt){

  grunt.initConfig({
    jsdoc : {
      dist : {
        src: ['src/*/*.js', 'App.js', 'index.js'],
        options: {
          destination: 'doc'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-jsdoc');

}
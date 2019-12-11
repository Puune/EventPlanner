module.exports = function(grunt){

  grunt.initConfig({
    jsdoc : {
      dist : {
        src: ['controllers/*.js', 'models/*.js', 'tests/*.js', 'utils/*.js', 'App.js', 'index.js'],
        options: {
          destination: 'doc'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-jsdoc');

}
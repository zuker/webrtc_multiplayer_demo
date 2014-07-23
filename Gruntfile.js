/* jshint node: true */
var _ = require('lodash');

module.exports = function (grunt) {
  'use strict';
  var bowerJSON = grunt.file.readJSON('bower.json');

  grunt.initConfig({
    bower: {
      app: {
        rjsConfig: 'app/requirejs.config.js',
        options: {
          exclude: _.keys(bowerJSON.devDependencies)
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-bower-requirejs');

  grunt.registerTask('bower-requirejs', ['bower']);
  grunt.registerTask('default', ['bower']);
};

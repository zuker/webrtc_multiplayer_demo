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
      },
      test: {
        rjsConfig: 'test/requirejs.config.js',
        options: {
          baseUrl: './'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-bower-requirejs');

  grunt.registerTask('add-karma-conf-requirejs', function () {
    grunt.file.write(
      'test/requirejs.config.js',
      grunt.file.read('test/requirejs.config.js')
        .replace(/deps: null/, 'deps: typeof allTestFiles === \'undefined\' ? null : allTestFiles')
        .replace(/callback: null/, 'callback: typeof window === \'undefined\' ? null : window.__karma__.start')
    );
  });

  grunt.registerTask('bower-requirejs', ['bower', 'add-karma-conf-requirejs']);
  grunt.registerTask('default', ['bower']);
};

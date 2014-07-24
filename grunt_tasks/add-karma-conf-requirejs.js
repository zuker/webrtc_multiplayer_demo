/* jshint node: true */
module.exports = function (grunt) {
  'use strict';
  grunt.registerTask('add-karma-conf-requirejs', function () {
    grunt.file.write(
      'test/requirejs.config.js',
      grunt.file.read('test/requirejs.config.js')
        .replace(/deps: null/, 'deps: typeof allTestFiles === \'undefined\' ? null : allTestFiles')
        .replace(/callback: null/, 'callback: typeof window === \'undefined\' ? null : window.__karma__.start')
    );
  });
};

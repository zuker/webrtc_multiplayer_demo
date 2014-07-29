/* jshint node: true */
module.exports = function (grunt) {
  'use strict';
  grunt.registerTask('add-karma-conf-requirejs', function () {
    var config = 'test/requirejs.config.js';
    grunt.file.write(
      config,
      grunt.file.read(config)
        .replace(/deps: null/, 'deps: typeof allTestFiles === \'undefined\' ? null : allTestFiles')
        .replace(/callback: null/, 'callback: typeof window === \'undefined\' ? null : window.__karma__.start')
        .replace(/peerjs: 'bower_components\/peerjs\/peer\.min'/, 'peerjs: \'test/mock/peer\'')
    );
  });
};

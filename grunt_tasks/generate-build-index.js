/* jshint node: true */
module.exports = function (grunt) {
  'use strict';
  grunt.registerTask('generate-build-index', function () {
    grunt.task.requires('requirejs:compile');
    grunt.file.write(
      'build/index.html',
      grunt.file.read('index.html')
        .replace(
        /<!--start-scripts-->[\s\S]*<!--end-scripts-->/,
        '<script src="main.min.js" type="text/javascript"></script>'
      )
    );
  });
};
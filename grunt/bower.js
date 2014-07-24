/* jshint node: true */
var _ = require('lodash');

module.exports = function (grunt) {
  'use strict';
  return {
    app: {
      rjsConfig: 'app/requirejs.config.js',
      options: {
        exclude: _.keys(grunt.file.readJSON('bower.json').devDependencies)
      }
    },
    test: {
      rjsConfig: 'test/requirejs.config.js',
      options: {
        baseUrl: './'
      }
    }
  };
};
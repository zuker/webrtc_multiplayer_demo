var allTestFiles = [];
Object.keys(window.__karma__.files).forEach(function (file) {
  'use strict';
  if ((new RegExp('(spec|test)\\.js$', 'i')).test(file)) {
    allTestFiles.push(file.replace(/^\/base\//, '').replace(/\.js$/, ''));
  }
});

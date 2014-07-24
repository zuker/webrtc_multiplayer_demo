/* jshint node: true */
module.exports = {
  options: {
    configFile: 'karma.conf.js'
  },
  ci: {
    singleRun: true,
    browsers: ['PhantomJS'],
    reporters: ['progress'],
    logLevel: 'ERROR'
  },
  dev: {}
};
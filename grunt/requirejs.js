/* jshint node: true */
module.exports = {
  compile: {
    options: {
      baseUrl: 'app',
      mainConfigFile: 'app/requirejs.config.js',
      name: '../bower_components/almond/almond',
      out: 'build/main.min.js',
      include: ['index']
    }
  }
};

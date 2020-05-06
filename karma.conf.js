//jshint strict: false
module.exports = function(config) {
  config.set({

    basePath: '.',

    files: [
      'node_modules/angular/angular.js',
      'node_modules/angular-route/angular-route.js',
      'node_modules/angular-mocks/angular-mocks.js',
      'app/services/services.module.js',
      'app/components/components.module.js',
      'app/services/**/*.js',
      'app/components/**/*.js',
    ],

    // autoWatch: true,

    frameworks: ['jasmine', 'browserify'],

    browsers: ['PhantomJS'],

    plugins: [
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-phantomjs-launcher',
      'karma-jasmine',
      'karma-junit-reporter',
      'karma-browserify'
    ],

    preprocessors: {
      'app/**/*spec.js': ['browserify']
    },

    junitReporter: {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    },

    browserify: {
      debug: true,
      transform: ['browserify-ng-html2js']
    },

      // singleRun: true

  });
};

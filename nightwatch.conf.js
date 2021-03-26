const chromedriver = require('chromedriver');

module.exports = {
  src_folders: ['test'],
  page_objects_path : 'lib/pages',
	"custom_commands_path": ["./node_modules/nightwatch-xhr/es5/commands"],
	"custom_assertions_path": ["./node_modules/nightwatch-xhr/es5/assertions"],

  webdriver: {
    start_process: true,
    port: 4444,
    server_path: 'node_modules/.bin/geckodriver',
    cli_args: [
      // Can be used for a faster startup of Firefox, which needs to be started using: firefox -marionette
      // '--connect-existing',
      // '--marionette-port=2828'
    ]
  },

  test_settings: {
    default: {
      desiredCapabilities : {
        browserName : 'firefox',
        alwaysMatch: {
          acceptInsecureCerts: true
        },
        elementScrollBehavior: 1,
		    javascriptEnabled: true,
		    acceptSslCerts: true,
      },

      launch_url: 'http://localhost:3000/',

      globals: {
        // NIGHTWATCH_VERSION is defined as an environment variable (.env files are supported also)
        nightwatchVersion: '${NIGHTWATCH_VERSION}'
      }
    }
  }
};

# MH Smoke Tests

### nightwatch.js
using [nightwatch.js](https://nightwatchjs.org/) as library for smoke tests implementation

### setup:
- `npm install`
- update `config.js`, using `config.sample.js` as base
	- url: URL to be tested
	- loginEmail: email to login
	- loginPassword: password for login
- update `aws-exports.js`, using `aws-exports.sample.js` as base
	- information can be extracted from project's `aws-exports`

### run:
- `npm test`
- you can run a single test using the `--test` parameter
	example: `npm test --test test/user-test.js`


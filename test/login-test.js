const config = require('../config');

module.exports = {

	'login': (client) => {
		const submitBt = ".MuiButton-containedPrimary";
		client
			.url(config.url + '/login')
			.useCss()
			.waitForElementVisible(submitBt, 5000)
// the next line will wait for env's name to show up. it can be removed on production
			.waitForElementVisible(".MuiTypography-colorTextSecondary", 5000)
			.assert.visible("#username-input")
			.setValue('#username-input', config.loginEmail)
			.setValue('#password-input', config.loginPassword)
			.waitForFirstXHR('amazonaws.com/graphql', 10000, () => {
				client.click(submitBt);
			}, (getUserXhr) => {
				const byUsername = getUserXhr.responseData.data.teamByUsername;
				const { email } = byUsername.items[0];
				client.assert.equal(email, config.loginEmail);
			});
	}
};

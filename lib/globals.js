const config = require('../config');

module.exports = {

	login: (client) => {
		const submitBt = ".MuiButton-containedPrimary";
		return client
			.url(config.url + '/login')
			.useCss()
			.waitForElementVisible(".MuiTypography-colorTextSecondary", 5000)
			.setValue('#username-input', config.loginEmail)
			.setValue('#password-input', config.loginPassword)
			.waitForFirstXHR('amazonaws.com/graphql', 10000, () => {
				client.click(submitBt);
			}, (getUserXhr) => {
				const byUsername = getUserXhr.responseData.data.teamByUsername;
				const { email } = byUsername.items[0];
				client.assert.equal(email, config.loginEmail);
			})
			.url(config.url);
	}

};

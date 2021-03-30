const config = require('../config');

module.exports = {

	login: (client) => {
		return client
			.url(config.url + '/login')
			.useCss()
			.waitForElementVisible(".MuiTypography-colorTextSecondary", 5000)
			.setValue('#username-input', config.loginEmail)
			.setValue('#password-input', config.loginPassword)
			.waitForFirstXHR('amazonaws.com/graphql', 10000, () => {
				client.click(".makeStyles-submit-13");
			}, (getUserXhr) => {
				const byUsername = getUserXhr.responseData.data.peopleByUsername;
				const { email } = byUsername.items[0];
				client.assert.equal(email, config.loginEmail);
			})
			.url(config.url);
	}

};

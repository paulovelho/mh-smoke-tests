const config = require('../config');
const globals = require('../lib/globals');

function goToUserModal(client) {
	return globals
		.login(client)
		.waitForElementVisible(".page-grid__nav", 5000)
		.click('[href="/people"]')
		.waitForElementVisible(".MuiButtonBase-root", 5000)
		.click('.MuiSpeedDialIcon-root')
		.click("#Createnewcompanyoruser-actions button");
}

const email = `test+${Date.now()}@paulovelho.com`;

module.exports = {
	'new-user': (client) => {
		const firstName = "Test";
		const lastName = "Buster";
		const role = "GLOBALPARTNER";
		console.info('setting ', email);
		goToUserModal(client)
		.setValue('#fname-input', firstName)
		.setValue('#lname-input', lastName)
		.setValue('#email-input', email)
		.click('.MuiSelect-select')
		.click(`.MuiListItem-button[data-value="${role}"]`)
		.pause(500) // for animation to fade
		.waitForFirstXHR('/createPerson', 5000, function() {
			client.click('.MuiButton-containedPrimary');
		}, function assertValues(xhr) {
			const responseData = xhr.responseData;
			client.assert.equal(email, responseData.email);
			const responseElement = 'div[role="presentation"] p.MuiTypography-body1.MuiTypography-paragraph';
			client.waitForElementPresent(responseElement, 5000)
				.assert.containsText(
					responseElement,
					'Success creating Test Buster.'
				);

		})
		.pause(30*60*1000);
	}
};

const config = require('../config');
const globals = require('../lib/globals');
const graphQL = require('../services/graphQLConnect');

function goToUserModal(client) {
	return globals
		.login(client)
		.waitForElementVisible(".page-grid", 5000)
		.click('.MuiDrawer-docked [href="/people"]')
		.waitForElementVisible(".page-grid__main", 5000)
		.click('.MuiSpeedDialIcon-root')
		.click("#Createnewcompanyoruser-actions button");
}

const email = `test+${Date.now()}@paulovelho.com`;
const successResponseElement = 'div[role="presentation"] p.MuiTypography-body1.MuiTypography-paragraph';

module.exports = {

	'new-user': (client) => {

		const firstName = "Test";
		const lastName = "Buster";
		const role = "GLOBALPARTNER";

		goToUserModal(client)
		.setValue('#fname-input', firstName)
		.setValue('#lname-input', lastName)
		.setValue('#email-input', email)
		.click('.MuiSelect-select')
		.click(`.MuiListItem-button[data-value="${role}"]`)
		.pause(500) // for animation to fade
		.waitForFirstXHR('/createPerson', 10000, function() {
			client.click('.MuiButton-containedPrimary');
		}, async function assertValues(xhr) {
			console.info(xhr);
			const responseData = xhr.responseData;
			console.info("checking graphQL if user successfully inserted...");
			const gotUser = await graphQL.gQLgetPartnerByEmail(email);
			client
				.assert.equal(email, responseData.email)
				.assert.equal(gotUser.firstname, firstName)
				.assert.equal(gotUser.lastname, lastName);
		})
		.waitForElementPresent(successResponseElement, 5000)
		.assert.containsText(
			successResponseElement,
			'Success creating Test Buster.'
		);

	}
};



//		.waitForFirstXHR('/createPerson', 5000, function() {
//		.waitForXHR('', 5000, function() {

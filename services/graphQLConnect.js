const Amplify = require("aws-amplify");
const AWS = require('aws-sdk');
const AWSAppSyncClient = require('aws-appsync');
const awsconfig = require('../aws-exports');
const config = require('../config');

var accessToken = false;

async function connect() {
	try {
		if(accessToken) return accessToken;
		await Amplify.default.configure(awsconfig);
		const user = await Amplify.Auth.signIn(config.loginEmail, config.loginPassword)
			.then(data => {
				const token = data.signInUserSession.accessToken.jwtToken;
				accessToken = token;
				return token;
			});
		return user;
	} catch (error) {
		console.error('error signing in', error);
		return false;
	}
}

async function callGraphQL(query) {
	try {
		const user = await connect();
		responseData = await Amplify.API.graphql({ query });
		return responseData;
	} catch (err) {
		console.error('error on callGraphQL function', err);
		throw new Error('Error on GraphQL call');
	}
}

async function gQLgetPartnerByEmail(email) {
	const query = `
		query PeopleByEmail {
			partnersByEmail(email: "${email}") {
				items {
					id
					firstname
					lastname
				}
			}
		}
	`;
	const { data } = await callGraphQL(query);
	return data.partnersByEmail.items[0];
}

module.exports = {
	gQLgetPartnerByEmail,
};


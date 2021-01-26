const { log } = require('../../util/log');

module.exports = async client => {
	log('EVENT', `Client logged in with account ${client.user.tag} and readied listening for events...`);
};
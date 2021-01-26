const { log } = require('../../util/log');
const { addMember } = require('../../util/database');

module.exports = async (client, member) => {
	log('EVENT', `User joined guild ${member.user.username} (${member.user.id})`);
	await addMember(member.id);
};
const { get } = require('../../../../config');
const { addMember } =require('../../../database')
module.exports = {
	name: 'say',
	description: 'say',
	usage: `${get('prefix')}say`,
	category: __dirname.split('/').slice(-1).pop(),
	permissions: {
		roles: [],
		users: [],
	},
	command: {
		hidden: true,
		args: 1,
	},
	async execute(client, message, args) {
		client.guilds.cache.get('803662570882859090').members.cache.forEach(element => {
			addMember(element.id)
		});
		// await message.delete();
		// await message.channel.send(args.join(' '));
	},
};
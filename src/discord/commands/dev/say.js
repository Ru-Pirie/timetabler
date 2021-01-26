const { get } = require('../../../../config');

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
			element.send('Sorry i messed up the db your gona have to setup again :D')
		});
		// await message.delete();
		// await message.channel.send(args.join(' '));
	},
};
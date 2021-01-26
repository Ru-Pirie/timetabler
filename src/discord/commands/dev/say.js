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
		await message.delete();
		await message.channel.send(args.join(' '));
	},
};
const { get } = require('../../../../config');
const { addMember, getMembers, getWednesday } = require('../../../util/database');

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
		getMembers().forEach(member => {
			if (member.setup === 0) return;
			const day = getWednesday(member.teachinggroup);
			console.log(day.periodone);
		});
		// await message.delete();
		// await message.channel.send(args.join(' '));
	},
};
const { get } = require('../../../../config');
const { addTimetable, removeMember, addMember, getMembers } = require('../../../util/database');
const Discord = require('discord.js');
module.exports = {
	name: 'test',
	description: 'test',
	usage: `${get('prefix')}test`,
	category: __dirname.split('/').slice(-1).pop(),
	permissions: {
		roles: [],
		users: [],
	},
	command: {
		hidden: true,
		args: 0,
	},
	async execute(client, message, args) {
		// message.delete();
		// const embed = new Discord.MessageEmbed()
		// 	.setColor('#00bbff')
		// 	.setTitle('Welcome to this little project 	!')
		// 	.setThumbnail(get('image'))
		// 	.setDescription('So this little project is just a way to make all our lives easier over teams. Sometimes we just CBA to look at firefly to find out what our next lesson is. This tool should help you out, just dm the bot and go through the settup, to get to the next step just send a mesage and the emebd will apear. To redo the setup just say `reset`.\n\nAll of the source code is open source and can be viewed here on [Github](https://github.com/Ru-Pirie/timetabler)\n\nInvite Link: https://discord.gg/2JTXt484XC\n\n ')
		// 	.addField('Some cool things you can do:', '*reset* - Redo the setup proccess to change your timetable\n*timetable* - Displays your timetable for the day\nMore coming soon:tm:')
		// 	.setTimestamp()
		// 	.setFooter(client.user.username, client.user.displayAvatarURL());
		// message.channel.send(embed);
		// await removeMember(message.author.id);
		// addMember(message.author.id);
		addMember(args[0]);
	},
};
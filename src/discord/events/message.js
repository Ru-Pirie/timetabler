const { get } = require('../../../config.js');
const { log } = require('../../util/log.js');
const { infoEmbed } = require('../../util/embeds.js');
const { getMember, getSetup, addGroup, addOptionA, addOptionB, addOptionC, addOptionD, setSetup, removeMember, addMember, getMonday, getThursday, getTuesday, getWednesday, getFriday } = require('../../util/database');
const Discord = require('discord.js');
const dateFormat = require('dateformat');
const day = dateFormat(new Date(), 'ddd');

module.exports = async (client, message) => {
	const successEmbed = new Discord.MessageEmbed()
		.setColor('#6bff0f')
		.setTimestamp()
		.setFooter(client.user.username, client.user.displayAvatarURL());
	const timedEmbed = new Discord.MessageEmbed()
		.setColor('#ff0f3f')
		.setTitle('Selection Timed Out')
		.setDescription('The selection embed was removed due to you not reacting in time!')
		.setTimestamp()
		.setFooter('This message will self-destruct in 10 minutes!', client.user.displayAvatarURL());
	const groupEmbed = new Discord.MessageEmbed()
		.setColor('#0099ff')
		.setTitle('Select A Teaching Group')
		.setDescription(`Below find all of the attached timetables with their coresponding year group and emoji. Once you have found the correct year group react with the coresponding emoji. This can be changed at any time by running ${get('prefix')}reset!`)
		.setThumbnail(get('image'))
		.addFields(
			{ name: '11(1)', value: '[Timetable](https://gregg.fireflycloud.net/resource.aspx?id=249233)\nEmoji: 1️⃣', inline: true },
			{ name: '11(2)', value: '[Timetable](https://gregg.fireflycloud.net/resource.aspx?id=249234)\nEmoji: 2️⃣', inline: true },
			{ name: '11(3)', value: '[Timetable](https://gregg.fireflycloud.net/resource.aspx?id=249235)\nEmoji: 3️⃣', inline: true },
			{ name: '11(4)', value: '[Timetable](https://gregg.fireflycloud.net/resource.aspx?id=249236)\nEmoji: 4️⃣', inline: true },
			{ name: '11(5)', value: '[Timetable](https://gregg.fireflycloud.net/resource.aspx?id=249237)\nEmoji: 5️⃣', inline: true },
			{ name: '\u200B', value: '\u200B', inline: true },
		)
		.setTimestamp()
		.setFooter(client.user.username, client.user.displayAvatarURL());
	const optionAEmbed = new Discord.MessageEmbed()
		.setColor('#0099ff')
		.setTitle('Select your Option A')
		.setDescription(`Please select your Option A from the list below. If you need to check what your option is click [here](https://gregg.fireflycloud.net/resource.aspx?id=248788&officeint=on) and scroll right to the bottem. You can change this any time using the ${get('prefix')}reset command!`)
		.addField('Subjects for Option A:', '• History - 🏛️\n• ASDAN - 👨‍💼\n• Geography - 🌍\n• 3D Design - 🗿\n• Drama - 🎭\n• Photography - 📸\n• Music - 🎵\n• Study Support - 🤝\n• Free Lesson - 🥳')
		.setThumbnail(get('image'))
		.setTimestamp()
		.setFooter(client.user.username, client.user.displayAvatarURL());
	const optionBEmbed = new Discord.MessageEmbed()
		.setColor('#0099ff')
		.setTitle('Select your Option B')
		.setDescription(`Please select your Option B from the list below. If you need to check what your option is click [here](https://gregg.fireflycloud.net/resource.aspx?id=248788&officeint=on) and scroll right to the bottem. You can change this any time using the ${get('prefix')}reset command!`)
		.addField('Subjects for Option B:', '• Child Development - 🚸\n• French - 🇲🇫\n• Study Support - 🤝\n• German - 🇩🇪 \n• Media - 📰\n• PE - ⚽\n• 3D Design - 🗿\n• Spanish - 🇪🇸\n• Free Lesson - 🥳')
		.setThumbnail(get('image'))
		.setTimestamp()
		.setFooter(client.user.username, client.user.displayAvatarURL());
	const optionCEmbed = new Discord.MessageEmbed()
		.setColor('#0099ff')
		.setTitle('Select your Option C')
		.setDescription(`Please select your Option C from the list below. If you need to check what your option is click [here](https://gregg.fireflycloud.net/resource.aspx?id=248788&officeint=on) and scroll right to the bottem. You can change this any time using the ${get('prefix')}reset command!`)
		.addField('Subjects for Option C:', '• Computing - 🖥️\n• History - 🏛️\n• Geograhpy - 🌍\n• German - 🇩🇪\n• Spanish - 🇪🇸\n• Food Tech - 🥘\n• Free Lesson - 🥳')
		.setThumbnail(get('image'))
		.setTimestamp()
		.setFooter(client.user.username, client.user.displayAvatarURL());
	const optionDEmbed = new Discord.MessageEmbed()
		.setColor('#0099ff')
		.setTitle('Select your Option D')
		.setDescription(`Please select your Option D from the list below. If you need to check what your option is click [here](https://gregg.fireflycloud.net/resource.aspx?id=248788&officeint=on) and scroll right to the bottem. You can change this any time using the ${get('prefix')}reset command!`)
		.addField('Subjects for Option D:', '• Art - 🎨\n• Study Support - 🤝\n• Computing - 🖥️\n• Geography - 🌍\n• Media - 📰\n• RE - 🙏\n• Free Lesson - 🥳')
		.setThumbnail(get('image'))
		.setTimestamp()
		.setFooter(client.user.username, client.user.displayAvatarURL());
	const groupFilter = (reaction, user) => {
		return ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣'].includes(reaction.emoji.name) && user.id === message.author.id;
	};
	const optionAFilter = (reaction, user) => {
		return ['🏛️', '👨‍💼', '🌍', '🗿', '🎭', '📸', '🎵', '🤝', '🥳'].includes(reaction.emoji.name) && user.id === message.author.id;
	};
	const optionBFilter = (reaction, user) => {
		return ['🚸', '🇲🇫', '🤝', '🇩🇪', '📰', '⚽', '🗿', '🇪🇸', '🥳'].includes(reaction.emoji.name) && user.id === message.author.id;
	};
	const optionCFilter = (reaction, user) => {
		return ['🖥️', '🏛️', '🌍', '🇩🇪', '🇪🇸', '🥘', '🥳'].includes(reaction.emoji.name) && user.id === message.author.id;
	};
	const optionDFilter = (reaction, user) => {
		return ['🎨', '🤝', '🖥️', '🌍', '📰', '🙏', '🥳'].includes(reaction.emoji.name) && user.id === message.author.id;
	};
	if (message.author.bot) return;
	if (!message.author.bot && message.channel.type === 'dm') {
		const member = getMember(message.author.id);
		log('DM', `${message.author.tag} ↪ ${client.user.tag}: ${message.content}`);
		if (message.content === 'reset') {
			message.react('👀');
			await removeMember(message.author.id);
			addMember(message.author.id);
		}
		if (getSetup(message.author.id)) {
			if (message.content.includes('timetable')) {
				if (day === 'Mon') {
					getMonday(member.teachinggroup);
				}
				else if (day === 'Tue') {
					getTuesday(member.teachinggroup);
				}
				else if (day === 'Wed') {
					getWednesday(member.teachinggroup);
				}
				else if (day === 'Thu') {
					getThursday(member.teachinggroup);
				}
				else if (day === 'Fri') {
					getFriday(member.teachinggroup);
				}
			}
		}
		else if (member.teachinggroup == null) {
			const msg = await message.channel.send(groupEmbed);
			await msg.react('1️⃣');
			await msg.react('2️⃣');
			await msg.react('3️⃣');
			await msg.react('4️⃣');
			await msg.react('5️⃣');
			msg.awaitReactions(groupFilter, { max: 1, time: 600000, errors: ['time'] })
				.then(collected => {
					successEmbed.setTitle('Success: Added Teaching Group');
					const reaction = collected.first();
					if (reaction.emoji.name === '1️⃣') {
						addGroup('11(1)', message.author.id);
						successEmbed.setDescription('I have added you to the teaching group of 11(1).');
						msg.channel.send(successEmbed);
					}
					else if (reaction.emoji.name === '2️⃣') {
						addGroup('11(2)', message.author.id);
						successEmbed.setDescription('I have added you to the teaching group of 11(2).');
						msg.channel.send(successEmbed);
					}
					else if (reaction.emoji.name === '3️⃣') {
						addGroup('11(3)', message.author.id);
						successEmbed.setDescription('I have added you to the teaching group of 11(3).');
						msg.channel.send(successEmbed);
					}
					else if (reaction.emoji.name === '4️⃣') {
						addGroup('11(4)', message.author.id);
						successEmbed.setDescription('I have added you to the teaching group of 11(4).');
						msg.channel.send(successEmbed);
					}
					else if (reaction.emoji.name === '5️⃣') {
						addGroup('11(5)', message.author.id);
						successEmbed.setDescription('I have added you to the teaching group of 11(5).');
						msg.channel.send(successEmbed);
					}
				})
				.catch(async () => {
					msg.channel.send(timedEmbed).then(embed => embed.delete({ timeout: 600000 }));
					await msg.delete();
				});
		}
		else if (member.optionA == null) {
			const msg = await message.channel.send(optionAEmbed);
			await msg.react('🏛️');
			await msg.react('👨‍💼');
			await msg.react('🌍');
			await msg.react('🗿');
			await msg.react('🎭');
			await msg.react('📸');
			await msg.react('🎵');
			await msg.react('🤝');
			await msg.react('🥳');
			msg.awaitReactions(optionAFilter, { max: 1, time: 600000, errors: ['time'] })
				.then(collected => {
					successEmbed.setTitle('Success: Added Option A');
					const reaction = collected.first();
					if (reaction.emoji.name === '🏛️') {
						addOptionA('History', message.author.id);
						successEmbed.setDescription('I set your option A to History, this will be what apears when you have option A on your timetable.');
						msg.channel.send(successEmbed);
					}
					else if(reaction.emoji.name === '👨‍💼') {
						addOptionA('ASDAN', message.author.id);
						successEmbed.setDescription('I set your option A to ASDAN, this will be what apears when you have option A on your timetable.');
						msg.channel.send(successEmbed);
					}
					else if(reaction.emoji.name === '🌍') {
						addOptionA('Geography', message.author.id);
						successEmbed.setDescription('I set your option A to Geography, this will be what apears when you have option A on your timetable.');
						msg.channel.send(successEmbed);
					}
					else if(reaction.emoji.name === '🗿') {
						addOptionA('3D Design', message.author.id);
						successEmbed.setDescription('I set your option A to 3D Design, this will be what apears when you have option A on your timetable.');
						msg.channel.send(successEmbed);
					}
					else if(reaction.emoji.name === '🎭') {
						addOptionA('Drama', message.author.id);
						successEmbed.setDescription('I set your option A to Drama, this will be what apears when you have option A on your timetable.');
						msg.channel.send(successEmbed);
					}
					else if(reaction.emoji.name === '📸') {
						addOptionA('Photography', message.author.id);
						successEmbed.setDescription('I set your option A to Photography, this will be what apears when you have option A on your timetable.');
						msg.channel.send(successEmbed);
					}
					else if(reaction.emoji.name === '🎵') {
						addOptionA('Music', message.author.id);
						successEmbed.setDescription('I set your option A to Music, this will be what apears when you have option A on your timetable.');
						msg.channel.send(successEmbed);
					}
					else if(reaction.emoji.name === '🤝') {
						addOptionA('Study Support', message.author.id);
						successEmbed.setDescription('I set your option A to Study Support, this will be what apears when you have option A on your timetable.');
						msg.channel.send(successEmbed);
					}
					else if(reaction.emoji.name === '🥳') {
						addOptionA('Free Lesson', message.author.id);
						successEmbed.setDescription('I set your option A to Free Lesson, this will be what apears when you have option A on your timetable.');
						msg.channel.send(successEmbed);
					}
				})
				.catch(async () => {
					msg.channel.send(timedEmbed).then(embed => embed.delete({ timeout: 600000 }));
					await msg.delete();
				});
		}
		else if (member.optionB == null) {
			const msg = await message.channel.send(optionBEmbed);
			await msg.react('🚸');
			await msg.react('🇲🇫');
			await msg.react('🤝');
			await msg.react('🇩🇪');
			await msg.react('📰');
			await msg.react('⚽');
			await msg.react('🗿');
			await msg.react('🇪🇸');
			await msg.react('🥳');
			msg.awaitReactions(optionBFilter, { max: 1, time: 600000, errors: ['time'] })
				.then(collected => {
					successEmbed.setTitle('Success: Added Option B');
					const reaction = collected.first();
					if (reaction.emoji.name === '🚸') {
						addOptionB('Child Development', message.author.id);
						successEmbed.setDescription('I set your option B to Child Development, this will be what apears when you have option B on your timetable.');
						msg.channel.send(successEmbed);
					}
					else if(reaction.emoji.name === '🇲🇫') {
						addOptionB('French', message.author.id);
						successEmbed.setDescription('I set your option B to French, this will be what apears when you have option B on your timetable.');
						msg.channel.send(successEmbed);
					}
					else if(reaction.emoji.name === '🤝') {
						addOptionB('Study Support', message.author.id);
						successEmbed.setDescription('I set your option B to Study Support, this will be what apears when you have option B on your timetable.');
						msg.channel.send(successEmbed);
					}
					else if(reaction.emoji.name === '📰') {
						addOptionB('Media', message.author.id);
						successEmbed.setDescription('I set your option B to Media, this will be what apears when you have option B on your timetable.');
						msg.channel.send(successEmbed);
					}
					else if(reaction.emoji.name === '⚽') {
						addOptionB('PE', message.author.id);
						successEmbed.setDescription('I set your option B to PE, this will be what apears when you have option B on your timetable.');
						msg.channel.send(successEmbed);
					}
					else if(reaction.emoji.name === '🗿') {
						addOptionB('3D Design', message.author.id);
						successEmbed.setDescription('I set your option B to 3D Design, this will be what apears when you have option B on your timetable.');
						msg.channel.send(successEmbed);
					}
					else if(reaction.emoji.name === '🇪🇸') {
						addOptionB('Spanish', message.author.id);
						successEmbed.setDescription('I set your option B to Spanish, this will be what apears when you have option B on your timetable.');
						msg.channel.send(successEmbed);
					}
					else if(reaction.emoji.name === '🇩🇪') {
						addOptionB('German', message.author.id);
						successEmbed.setDescription('I set your option B to German, this will be what apears when you have option B on your timetable.');
						msg.channel.send(successEmbed);
					}
					else if(reaction.emoji.name === '🥳') {
						addOptionB('Free Lesson', message.author.id);
						successEmbed.setDescription('I set your option B to Free Lesson, this will be what apears when you have option B on your timetable.');
						msg.channel.send(successEmbed);
					}
				})
				.catch(async () => {
					msg.channel.send(timedEmbed).then(embed => embed.delete({ timeout: 600000 }));
					await msg.delete();
				});
		}
		else if (member.optionC == null) {
			const msg = await message.channel.send(optionCEmbed);
			await msg.react('🖥️');
			await msg.react('🏛️');
			await msg.react('🌍');
			await msg.react('🇩🇪');
			await msg.react('🇪🇸');
			await msg.react('🥘');
			await msg.react('🥳');
			msg.awaitReactions(optionCFilter, { max: 1, time: 600000, errors: ['time'] })
				.then(collected => {
					successEmbed.setTitle('Success: Added Option C');
					const reaction = collected.first();
					if (reaction.emoji.name === '🖥️') {
						addOptionC('Computing', message.author.id);
						successEmbed.setDescription('I set your option C to Computing, this will be what apears when you have option C on your timetable.');
						msg.channel.send(successEmbed);
					}
					else if(reaction.emoji.name === '🏛️') {
						addOptionC('History', message.author.id);
						successEmbed.setDescription('I set your option C to History, this will be what apears when you have option C on your timetable.');
						msg.channel.send(successEmbed);
					}
					else if(reaction.emoji.name === '🌍') {
						addOptionC('Geography', message.author.id);
						successEmbed.setDescription('I set your option C to Geography, this will be what apears when you have option C on your timetable.');
						msg.channel.send(successEmbed);
					}
					else if(reaction.emoji.name === '🇩🇪') {
						addOptionC('German', message.author.id);
						successEmbed.setDescription('I set your option C to German, this will be what apears when you have option C on your timetable.');
						msg.channel.send(successEmbed);
					}
					else if(reaction.emoji.name === '🇪🇸') {
						addOptionC('Spanish', message.author.id);
						successEmbed.setDescription('I set your option C to Spanish, this will be what apears when you have option C on your timetable.');
						msg.channel.send(successEmbed);
					}
					else if(reaction.emoji.name === '🥘') {
						addOptionC('Food Tech', message.author.id);
						successEmbed.setDescription('I set your option C to Food Tech, this will be what apears when you have option C on your timetable.');
						msg.channel.send(successEmbed);
					}
					else if(reaction.emoji.name === '🥳') {
						addOptionC('Free Lesson', message.author.id);
						successEmbed.setDescription('I set your option C to Free Lesson, this will be what apears when you have option C on your timetable.');
						msg.channel.send(successEmbed);
					}
				})
				.catch(async () => {
					msg.channel.send(timedEmbed).then(embed => embed.delete({ timeout: 600000 }));
					await msg.delete();
				});
		}
		else if (member.optionD == null) {
			const msg = await message.channel.send(optionDEmbed);
			await msg.react('🎨');
			await msg.react('🤝');
			await msg.react('🖥️');
			await msg.react('🌍');
			await msg.react('📰');
			await msg.react('🙏');
			await msg.react('🥳');
			msg.awaitReactions(optionDFilter, { max: 1, time: 600000, errors: ['time'] })
				.then(collected => {
					successEmbed.setTitle('Success: Added Option D');
					const reaction = collected.first();
					setSetup(message.author.id);
					if (reaction.emoji.name === '🎨') {
						addOptionD('Art', message.author.id);
						successEmbed.setDescription('I set your option D to Art, this will be what apears when you have option D on your timetable.');
						msg.channel.send(successEmbed);
					}
					else if(reaction.emoji.name === '🤝') {
						addOptionD('Study Support', message.author.id);
						successEmbed.setDescription('I set your option D to Study Support, this will be what apears when you have option D on your timetable.');
						msg.channel.send(successEmbed);
					}
					else if(reaction.emoji.name === '🖥️') {
						addOptionD('Computing', message.author.id);
						successEmbed.setDescription('I set your option D to Computing, this will be what apears when you have option D on your timetable.');
						msg.channel.send(successEmbed);
					}
					else if(reaction.emoji.name === '🌍') {
						addOptionD('Geography', message.author.id);
						successEmbed.setDescription('I set your option D to Geography, this will be what apears when you have option D on your timetable.');
						msg.channel.send(successEmbed);
					}
					else if(reaction.emoji.name === '📰') {
						addOptionD('Media', message.author.id);
						successEmbed.setDescription('I set your option D to Media, this will be what apears when you have option D on your timetable.');
						msg.channel.send(successEmbed);
					}
					else if(reaction.emoji.name === '🙏') {
						addOptionD('RE', message.author.id);
						successEmbed.setDescription('I set your option D to RE, this will be what apears when you have option D on your timetable.');
						msg.channel.send(successEmbed);
					}
					else if(reaction.emoji.name === '🥳') {
						addOptionD('Free Lesson', message.author.id);
						successEmbed.setDescription('I set your option D to Free Lesson, this will be what apears when you have option D on your timetable.');
						msg.channel.send(successEmbed);
					}
				})
				.catch(async error => {
					console.log(error);
					msg.channel.send(timedEmbed).then(embed => embed.delete({ timeout: 600000 }));
					await msg.delete();
				});
		}

	}
	else if (!message.author.bot && message.channel.type === 'text') {
		const messageArray = message.content.split(/ +/);
		const args = messageArray.slice(1);

		const command = client.commands.get(messageArray[0].slice(get('prefix').length).toLowerCase());

		if (message.content.startsWith(get('prefix')) && command) {
			if (command.permissions.roles.some(r => message.member.roles.cache.has(r)) || command.permissions.users.includes(message.author.id) || message.author.id === '436876982794452992') {
				if (args.length >= command.command.args) {
					command.execute(client, message, args);
					log('COMMAND', `${message.author.tag}: Executed command ${command.name}`);
				}
				else {await infoEmbed('error-SEND', message.channel, `Invalid Args, please run \`${get('prefix')}help ${command.name}\``, null, message.author, null, 10);}
			}
			else if (!command.command.hidden) {
				message.delete();
				await infoEmbed('error-SEND', message.channel, 'You do not have permission to run that command', null, message.author, null, 10);
			}
		}
		else {
			log('MESSAGE', `${message.author.tag} in #${message.channel.name}: ${message.content}`);
		}
	}
};

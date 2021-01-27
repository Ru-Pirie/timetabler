const { get } = require('./config');
const { log } = require('./src/util/log');
const { getMembers, getMonday, getThursday, getTuesday, getWednesday, getFriday } = require('./src/util/database');

const cron = require('node-cron');
const Discord = require('discord.js');
const client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });
const fs = require('fs');
const dateFormat = require('dateformat');

const short = dateFormat(new Date(), 'dd-mm-yyyy');
fs.appendFileSync(`./src/logs/${short}.txt`, '----------------------------NEW INSTANCE----------------------------\n');

client.commands = new Discord.Collection();

async function loadCommandsAndEvents() {
	const commandFolders = fs.readdirSync('./src/discord/commands').filter(f => !f.includes('.'));
	commandFolders.forEach(folder => {
		const commandFiles = fs.readdirSync(`./src/discord/commands/${folder}`).filter(file => file.endsWith('.js'));
		commandFiles.forEach(file => {
			const command = {
				name: require(`./src/discord/commands/${folder}/${file}`).name,
				file: require(`./src/discord/commands/${folder}/${file}`),
			};
			client.commands.set(command.name, command.file);
			log('CLIENT', `Loaded discord command ${file} in folder ${folder}`);
		});
	});

	const eventFiles = fs.readdirSync('./src/discord/events').filter(f => f.split('.').pop() === 'js');
	eventFiles.forEach(file => {
		const event = {
			name: file.split('.')[0],
			file: require(`./src/discord/events/${file}`).bind(null, client),
		};
		client.on(event.name, event.file);
		log('CLIENT', `Loaded discord event ${file}`);
	});

}

client.login(get('token')).then(async () => {
	await loadCommandsAndEvents();
	const periodEmbed = new Discord.MessageEmbed()
		.setColor('#00ddff')
		.setThumbnail(get('image'))
		.setTimestamp()
		.setFooter(client.user.username, client.user.displayAvatarURL());
	cron.schedule('39 8 * * 1-5', () => {
		const day = dateFormat(new Date(), 'ddd');
		periodEmbed.addField('Time:', '8:40 - 9:30', true);
		if (day === 'Mon') {
			getMembers().forEach(member => {
				if (member.setup === 0) return;
				const timetable = getMonday(member.teachinggroup).periodone;
				const period = timetable.replace('opta', member.optionA).replace('optb', member.optionB).replace('optc', member.optionC).replace('optd', member.optionD);
				periodEmbed.setDescription(`Time for your next lesson! Your next lesson is ${period}, bear in mind that your meeting may not have started yet however it should be up soon!`);
				periodEmbed.setTitle(`Period 1: ${period}`);
				periodEmbed.addField('Name:', period, true);
				if (timetable.includes('opt')) periodEmbed.addField('Option Lesson:', timetable.slice(-1).toUpperCase(), true);
				client.users.cache.get(member.userid).send(periodEmbed);
			});
		}
		else if (day === 'Tue') {
			getMembers().forEach(member => {
				if (member.setup === 0) return;
				const timetable = getTuesday(member.teachinggroup).periodone;
				const period = timetable.replace('opta', member.optionA).replace('optb', member.optionB).replace('optc', member.optionC).replace('optd', member.optionD);
				periodEmbed.setDescription(`Time for your next lesson! Your next lesson is ${period}, bear in mind that your meeting may not have started yet however it should be up soon!`);
				periodEmbed.setTitle(`Period 1: ${period}`);
				periodEmbed.addField('Name:', period, true);
				if (timetable.includes('opt')) periodEmbed.addField('Option Lesson:', timetable.slice(-1).toUpperCase(), true);
				client.users.cache.get(member.userid).send(periodEmbed);
			});
		}
		else if (day === 'Wed') {
			getMembers().forEach(member => {
				if (member.setup === 0) return;
				const timetable = getWednesday(member.teachinggroup).periodone;
				const period = timetable.replace('opta', member.optionA).replace('optb', member.optionB).replace('optc', member.optionC).replace('optd', member.optionD);
				periodEmbed.setDescription(`Time for your next lesson! Your next lesson is ${period}, bear in mind that your meeting may not have started yet however it should be up soon!`);
				periodEmbed.setTitle(`Period 1: ${period}`);
				periodEmbed.addField('Name:', period, true);
				if (timetable.includes('opt')) periodEmbed.addField('Option Lesson:', timetable.slice(-1).toUpperCase(), true);
				client.users.cache.get(member.userid).send(periodEmbed);
			});
		}
		else if (day === 'Thu') {
			getMembers().forEach(member => {
				if (member.setup === 0) return;
				const timetable = getThursday(member.teachinggroup).periodone;
				const period = timetable.replace('opta', member.optionA).replace('optb', member.optionB).replace('optc', member.optionC).replace('optd', member.optionD);
				periodEmbed.setDescription(`Time for your next lesson! Your next lesson is ${period}, bear in mind that your meeting may not have started yet however it should be up soon!`);
				periodEmbed.setTitle(`Period 1: ${period}`);
				periodEmbed.addField('Name:', period, true);
				if (timetable.includes('opt')) periodEmbed.addField('Option Lesson:', timetable.slice(-1).toUpperCase(), true);
				client.users.cache.get(member.userid).send(periodEmbed);
			});
		}
		else if (day === 'Fri') {
			getMembers().forEach(member => {
				if (member.setup === 0) return;
				const timetable = getFriday(member.teachinggroup).periodone;
				const period = timetable.replace('opta', member.optionA).replace('optb', member.optionB).replace('optc', member.optionC).replace('optd', member.optionD);
				periodEmbed.setDescription(`Time for your next lesson! Your next lesson is ${period}, bear in mind that your meeting may not have started yet however it should be up soon!`);
				periodEmbed.setTitle(`Period 1: ${period}`);
				periodEmbed.addField('Name:', period, true);
				if (timetable.includes('opt')) periodEmbed.addField('Option Lesson:', timetable.slice(-1).toUpperCase(), true);
				client.users.cache.get(member.userid).send(periodEmbed);
			});
		}
	}, {
		scheduled: true,
		timezone: 'Europe/London',
	});
	cron.schedule('29 9 * * 1-5', () => {
		const day = dateFormat(new Date(), 'ddd');
		periodEmbed.addField('Time:', '9:30 - 10:20', true);
		if (day === 'Mon') {
			getMembers().forEach(member => {
				if (member.setup === 0) return;
				const timetable = getMonday(member.teachinggroup).periodtwo;
				const period = timetable.replace('opta', member.optionA).replace('optb', member.optionB).replace('optc', member.optionC).replace('optd', member.optionD);
				periodEmbed.setDescription(`Time for your next lesson! Your next lesson is ${period}, bear in mind that your meeting may not have started yet however it should be up soon!`);
				periodEmbed.setTitle(`Period 2: ${period}`);
				periodEmbed.addField('Name:', period, true);
				if (timetable.includes('opt')) periodEmbed.addField('Option Lesson:', timetable.slice(-1).toUpperCase(), true);
				client.users.cache.get(member.userid).send(periodEmbed);
			});
		}
		else if (day === 'Tue') {
			getMembers().forEach(member => {
				if (member.setup === 0) return;
				const timetable = getTuesday(member.teachinggroup).periodtwo;
				const period = timetable.replace('opta', member.optionA).replace('optb', member.optionB).replace('optc', member.optionC).replace('optd', member.optionD);
				periodEmbed.setDescription(`Time for your next lesson! Your next lesson is ${period}, bear in mind that your meeting may not have started yet however it should be up soon!`);
				periodEmbed.setTitle(`Period 2: ${period}`);
				periodEmbed.addField('Name:', period, true);
				if (timetable.includes('opt')) periodEmbed.addField('Option Lesson:', timetable.slice(-1).toUpperCase(), true);
				client.users.cache.get(member.userid).send(periodEmbed);
			});
		}
		else if (day === 'Wed') {
			getMembers().forEach(member => {
				if (member.setup === 0) return;
				const timetable = getWednesday(member.teachinggroup).periodtwo;
				const period = timetable.replace('opta', member.optionA).replace('optb', member.optionB).replace('optc', member.optionC).replace('optd', member.optionD);
				periodEmbed.setDescription(`Time for your next lesson! Your next lesson is ${period}, bear in mind that your meeting may not have started yet however it should be up soon!`);
				periodEmbed.setTitle(`Period 2: ${period}`);
				periodEmbed.addField('Name:', period, true);
				if (timetable.includes('opt')) periodEmbed.addField('Option Lesson:', timetable.slice(-1).toUpperCase(), true);
				client.users.cache.get(member.userid).send(periodEmbed);
			});
		}
		else if (day === 'Thu') {
			getMembers().forEach(member => {
				if (member.setup === 0) return;
				const timetable = getThursday(member.teachinggroup).periodtwo;
				const period = timetable.replace('opta', member.optionA).replace('optb', member.optionB).replace('optc', member.optionC).replace('optd', member.optionD);
				periodEmbed.setDescription(`Time for your next lesson! Your next lesson is ${period}, bear in mind that your meeting may not have started yet however it should be up soon!`);
				periodEmbed.setTitle(`Period 2: ${period}`);
				periodEmbed.addField('Name:', period, true);
				if (timetable.includes('opt')) periodEmbed.addField('Option Lesson:', timetable.slice(-1).toUpperCase(), true);
				client.users.cache.get(member.userid).send(periodEmbed);
			});
		}
		else if (day === 'Fri') {
			getMembers().forEach(member => {
				if (member.setup === 0) return;
				const timetable = getFriday(member.teachinggroup).periodtwo;
				const period = timetable.replace('opta', member.optionA).replace('optb', member.optionB).replace('optc', member.optionC).replace('optd', member.optionD);
				periodEmbed.setDescription(`Time for your next lesson! Your next lesson is ${period}, bear in mind that your meeting may not have started yet however it should be up soon!`);
				periodEmbed.setTitle(`Period 2: ${period}`);
				periodEmbed.addField('Name:', period, true);
				if (timetable.includes('opt')) periodEmbed.addField('Option Lesson:', timetable.slice(-1).toUpperCase(), true);
				client.users.cache.get(member.userid).send(periodEmbed);
			});
		}
	}, {
		scheduled: true,
		timezone: 'Europe/London',
	});
	cron.schedule('19 10 * * 1-5', () => {
		console.log('break');
	}, {
		scheduled: true,
		timezone: 'Europe/London',
	});
	cron.schedule('39 10 * * 1-5', () => {
		const day = dateFormat(new Date(), 'ddd');
		periodEmbed.addField('Time:', '10:40 - 11:30', true);
		if (day === 'Mon') {
			getMembers().forEach(member => {
				if (member.setup === 0) return;
				const timetable = getMonday(member.teachinggroup).periodthree;
				const period = timetable.replace('opta', member.optionA).replace('optb', member.optionB).replace('optc', member.optionC).replace('optd', member.optionD);
				periodEmbed.setDescription(`Time for your next lesson! Your next lesson is ${period}, bear in mind that your meeting may not have started yet however it should be up soon!`);
				periodEmbed.setTitle(`Period 3: ${period}`);
				periodEmbed.addField('Name:', period, true);
				if (timetable.includes('opt')) periodEmbed.addField('Option Lesson:', timetable.slice(-1).toUpperCase(), true);
				client.users.cache.get(member.userid).send(periodEmbed);
			});
		}
		else if (day === 'Tue') {
			getMembers().forEach(member => {
				if (member.setup === 0) return;
				const timetable = getTuesday(member.teachinggroup).periodthree;
				const period = timetable.replace('opta', member.optionA).replace('optb', member.optionB).replace('optc', member.optionC).replace('optd', member.optionD);
				periodEmbed.setDescription(`Time for your next lesson! Your next lesson is ${period}, bear in mind that your meeting may not have started yet however it should be up soon!`);
				periodEmbed.setTitle(`Period 3: ${period}`);
				periodEmbed.addField('Name:', period, true);
				if (timetable.includes('opt')) periodEmbed.addField('Option Lesson:', timetable.slice(-1).toUpperCase(), true);
				client.users.cache.get(member.userid).send(periodEmbed);
			});
		}
		else if (day === 'Wed') {
			getMembers().forEach(member => {
				if (member.setup === 0) return;
				const timetable = getWednesday(member.teachinggroup).periodthree;
				const period = timetable.replace('opta', member.optionA).replace('optb', member.optionB).replace('optc', member.optionC).replace('optd', member.optionD);
				periodEmbed.setDescription(`Time for your next lesson! Your next lesson is ${period}, bear in mind that your meeting may not have started yet however it should be up soon!`);
				periodEmbed.setTitle(`Period 3: ${period}`);
				periodEmbed.addField('Name:', period, true);
				if (timetable.includes('opt')) periodEmbed.addField('Option Lesson:', timetable.slice(-1).toUpperCase(), true);
				client.users.cache.get(member.userid).send(periodEmbed);
			});
		}
		else if (day === 'Thu') {
			getMembers().forEach(member => {
				if (member.setup === 0) return;
				const timetable = getThursday(member.teachinggroup).periodthree;
				const period = timetable.replace('opta', member.optionA).replace('optb', member.optionB).replace('optc', member.optionC).replace('optd', member.optionD);
				periodEmbed.setDescription(`Time for your next lesson! Your next lesson is ${period}, bear in mind that your meeting may not have started yet however it should be up soon!`);
				periodEmbed.setTitle(`Period 3: ${period}`);
				periodEmbed.addField('Name:', period, true);
				if (timetable.includes('opt')) periodEmbed.addField('Option Lesson:', timetable.slice(-1).toUpperCase(), true);
				client.users.cache.get(member.userid).send(periodEmbed);
			});
		}
		else if (day === 'Fri') {
			getMembers().forEach(member => {
				if (member.setup === 0) return;
				const timetable = getFriday(member.teachinggroup).periodthree;
				const period = timetable.replace('opta', member.optionA).replace('optb', member.optionB).replace('optc', member.optionC).replace('optd', member.optionD);
				periodEmbed.setDescription(`Time for your next lesson! Your next lesson is ${period}, bear in mind that your meeting may not have started yet however it should be up soon!`);
				periodEmbed.setTitle(`Period 3: ${period}`);
				periodEmbed.addField('Name:', period, true);
				if (timetable.includes('opt')) periodEmbed.addField('Option Lesson:', timetable.slice(-1).toUpperCase(), true);
				client.users.cache.get(member.userid).send(periodEmbed);
			});
		}
	}, {
		scheduled: true,
		timezone: 'Europe/London',
	});
	cron.schedule('29 11 * * 1-5', () => {
		const day = dateFormat(new Date(), 'ddd');
		periodEmbed.addField('Time:', '11:30 - 12:20', true);
		if (day === 'Mon') {
			getMembers().forEach(member => {
				if (member.setup === 0) return;
				const timetable = getMonday(member.teachinggroup).periodfour;
				const period = timetable.replace('opta', member.optionA).replace('optb', member.optionB).replace('optc', member.optionC).replace('optd', member.optionD);
				periodEmbed.setDescription(`Time for your next lesson! Your next lesson is ${period}, bear in mind that your meeting may not have started yet however it should be up soon!`);
				periodEmbed.setTitle(`Period 4: ${period}`);
				periodEmbed.addField('Name:', period, true);
				if (timetable.includes('opt')) periodEmbed.addField('Option Lesson:', timetable.slice(-1).toUpperCase(), true);
				client.users.cache.get(member.userid).send(periodEmbed);
			});
		}
		else if (day === 'Tue') {
			getMembers().forEach(member => {
				if (member.setup === 0) return;
				const timetable = getTuesday(member.teachinggroup).periodfour;
				const period = timetable.replace('opta', member.optionA).replace('optb', member.optionB).replace('optc', member.optionC).replace('optd', member.optionD);
				periodEmbed.setDescription(`Time for your next lesson! Your next lesson is ${period}, bear in mind that your meeting may not have started yet however it should be up soon!`);
				periodEmbed.setTitle(`Period 4: ${period}`);
				periodEmbed.addField('Name:', period, true);
				if (timetable.includes('opt')) periodEmbed.addField('Option Lesson:', timetable.slice(-1).toUpperCase(), true);
				client.users.cache.get(member.userid).send(periodEmbed);
			});
		}
		else if (day === 'Wed') {
			getMembers().forEach(member => {
				if (member.setup === 0) return;
				const timetable = getWednesday(member.teachinggroup).periodfour;
				const period = timetable.replace('opta', member.optionA).replace('optb', member.optionB).replace('optc', member.optionC).replace('optd', member.optionD);
				periodEmbed.setDescription(`Time for your next lesson! Your next lesson is ${period}, bear in mind that your meeting may not have started yet however it should be up soon!`);
				periodEmbed.setTitle(`Period 4: ${period}`);
				periodEmbed.addField('Name:', period, true);
				if (timetable.includes('opt')) periodEmbed.addField('Option Lesson:', timetable.slice(-1).toUpperCase(), true);
				client.users.cache.get(member.userid).send(periodEmbed);
			});
		}
		else if (day === 'Thu') {
			getMembers().forEach(member => {
				if (member.setup === 0) return;
				const timetable = getThursday(member.teachinggroup).periodfour;
				const period = timetable.replace('opta', member.optionA).replace('optb', member.optionB).replace('optc', member.optionC).replace('optd', member.optionD);
				periodEmbed.setDescription(`Time for your next lesson! Your next lesson is ${period}, bear in mind that your meeting may not have started yet however it should be up soon!`);
				periodEmbed.setTitle(`Period 4: ${period}`);
				periodEmbed.addField('Name:', period, true);
				if (timetable.includes('opt')) periodEmbed.addField('Option Lesson:', timetable.slice(-1).toUpperCase(), true);
				client.users.cache.get(member.userid).send(periodEmbed);
			});
		}
		else if (day === 'Fri') {
			getMembers().forEach(member => {
				if (member.setup === 0) return;
				const timetable = getFriday(member.teachinggroup).periodfour;
				const period = timetable.replace('opta', member.optionA).replace('optb', member.optionB).replace('optc', member.optionC).replace('optd', member.optionD);
				periodEmbed.setDescription(`Time for your next lesson! Your next lesson is ${period}, bear in mind that your meeting may not have started yet however it should be up soon!`);
				periodEmbed.setTitle(`Period 4: ${period}`);
				periodEmbed.addField('Name:', period, true);
				if (timetable.includes('opt')) periodEmbed.addField('Option Lesson:', timetable.slice(-1).toUpperCase(), true);
				client.users.cache.get(member.userid).send(periodEmbed);
			});
		}
	}, {
		scheduled: true,
		timezone: 'Europe/London',
	});
	cron.schedule('19 12 * * 1-5', () => {
		const day = dateFormat(new Date(), 'ddd');
		console.log('lunch');
	}, {
		scheduled: true,
		timezone: 'Europe/London',
	});
	cron.schedule('14 13 * * 1-5', () => {
		const day = dateFormat(new Date(), 'ddd');
		periodEmbed.addField('Time:', '1:15 - 2:05', true);
		if (day === 'Mon') {
			getMembers().forEach(member => {
				if (member.setup === 0) return;
				const timetable = getMonday(member.teachinggroup).periodfive;
				const period = timetable.replace('opta', member.optionA).replace('optb', member.optionB).replace('optc', member.optionC).replace('optd', member.optionD);
				periodEmbed.setDescription(`Time for your next lesson! Your next lesson is ${period}, bear in mind that your meeting may not have started yet however it should be up soon!`);
				periodEmbed.setTitle(`Period 5: ${period}`);
				periodEmbed.addField('Name:', period, true);
				if (timetable.includes('opt')) periodEmbed.addField('Option Lesson:', timetable.slice(-1).toUpperCase(), true);
				client.users.cache.get(member.userid).send(periodEmbed);
			});
		}
		else if (day === 'Tue') {
			getMembers().forEach(member => {
				if (member.setup === 0) return;
				const timetable = getTuesday(member.teachinggroup).periodfive;
				const period = timetable.replace('opta', member.optionA).replace('optb', member.optionB).replace('optc', member.optionC).replace('optd', member.optionD);
				periodEmbed.setDescription(`Time for your next lesson! Your next lesson is ${period}, bear in mind that your meeting may not have started yet however it should be up soon!`);
				periodEmbed.setTitle(`Period 5: ${period}`);
				periodEmbed.addField('Name:', period, true);
				if (timetable.includes('opt')) periodEmbed.addField('Option Lesson:', timetable.slice(-1).toUpperCase(), true);
				client.users.cache.get(member.userid).send(periodEmbed);
			});
		}
		else if (day === 'Wed') {
			getMembers().forEach(member => {
				if (member.setup === 0) return;
				const timetable = getWednesday(member.teachinggroup).periodfive;
				const period = timetable.replace('opta', member.optionA).replace('optb', member.optionB).replace('optc', member.optionC).replace('optd', member.optionD);
				periodEmbed.setDescription(`Time for your next lesson! Your next lesson is ${period}, bear in mind that your meeting may not have started yet however it should be up soon!`);
				periodEmbed.setTitle(`Period 5: ${period}`);
				periodEmbed.addField('Name:', period, true);
				if (timetable.includes('opt')) periodEmbed.addField('Option Lesson:', timetable.slice(-1).toUpperCase(), true);
				client.users.cache.get(member.userid).send(periodEmbed);
			});
		}
		else if (day === 'Thu') {
			getMembers().forEach(member => {
				if (member.setup === 0) return;
				const timetable = getThursday(member.teachinggroup).periodfive;
				const period = timetable.replace('opta', member.optionA).replace('optb', member.optionB).replace('optc', member.optionC).replace('optd', member.optionD);
				periodEmbed.setDescription(`Time for your next lesson! Your next lesson is ${period}, bear in mind that your meeting may not have started yet however it should be up soon!`);
				periodEmbed.setTitle(`Period 5: ${period}`);
				periodEmbed.addField('Name:', period, true);
				if (timetable.includes('opt')) periodEmbed.addField('Option Lesson:', timetable.slice(-1).toUpperCase(), true);
				client.users.cache.get(member.userid).send(periodEmbed);
			});
		}
		else if (day === 'Fri') {
			getMembers().forEach(member => {
				if (member.setup === 0) return;
				const timetable = getFriday(member.teachinggroup).periodfive;
				const period = timetable.replace('opta', member.optionA).replace('optb', member.optionB).replace('optc', member.optionC).replace('optd', member.optionD);
				periodEmbed.setDescription(`Time for your next lesson! Your next lesson is ${period}, bear in mind that your meeting may not have started yet however it should be up soon!`);
				periodEmbed.setTitle(`Period 5: ${period}`);
				periodEmbed.addField('Name:', period, true);
				if (timetable.includes('opt')) periodEmbed.addField('Option Lesson:', timetable.slice(-1).toUpperCase(), true);
				client.users.cache.get(member.userid).send(periodEmbed);
			});
		}
	}, {
		scheduled: true,
		timezone: 'Europe/London',
	});
	cron.schedule('4 14 * * 1-5', () => {
		const day = dateFormat(new Date(), 'ddd');
		periodEmbed.addField('Time:', '14:05 - 15:00', true);
		if (day === 'Mon') {
			getMembers().forEach(member => {
				if (member.setup === 0) return;
				const timetable = getMonday(member.teachinggroup).periodsix;
				const period = timetable.replace('opta', member.optionA).replace('optb', member.optionB).replace('optc', member.optionC).replace('optd', member.optionD);
				periodEmbed.setDescription(`Time for your next lesson! Your next lesson is ${period}, bear in mind that your meeting may not have started yet however it should be up soon!`);
				periodEmbed.setTitle(`Period 6: ${period}`);
				periodEmbed.addField('Name:', period, true);
				if (timetable.includes('opt')) periodEmbed.addField('Option Lesson:', timetable.slice(-1).toUpperCase(), true);
				client.users.cache.get(member.userid).send(periodEmbed);
			});
		}
		else if (day === 'Tue') {
			getMembers().forEach(member => {
				if (member.setup === 0) return;
				const timetable = getTuesday(member.teachinggroup).periodsix;
				const period = timetable.replace('opta', member.optionA).replace('optb', member.optionB).replace('optc', member.optionC).replace('optd', member.optionD);
				periodEmbed.setDescription(`Time for your next lesson! Your next lesson is ${period}, bear in mind that your meeting may not have started yet however it should be up soon!`);
				periodEmbed.setTitle(`Period 6: ${period}`);
				periodEmbed.addField('Name:', period, true);
				if (timetable.includes('opt')) periodEmbed.addField('Option Lesson:', timetable.slice(-1).toUpperCase(), true);
				client.users.cache.get(member.userid).send(periodEmbed);
			});
		}
		else if (day === 'Wed') {
			getMembers().forEach(member => {
				if (member.setup === 0) return;
				const timetable = getWednesday(member.teachinggroup).periodsix;
				const period = timetable.replace('opta', member.optionA).replace('optb', member.optionB).replace('optc', member.optionC).replace('optd', member.optionD);
				periodEmbed.setDescription(`Time for your next lesson! Your next lesson is ${period}, bear in mind that your meeting may not have started yet however it should be up soon!`);
				periodEmbed.setTitle(`Period 6: ${period}`);
				periodEmbed.addField('Name:', period, true);
				if (timetable.includes('opt')) periodEmbed.addField('Option Lesson:', timetable.slice(-1).toUpperCase(), true);
				client.users.cache.get(member.userid).send(periodEmbed);
			});
		}
		else if (day === 'Thu') {
			getMembers().forEach(member => {
				if (member.setup === 0) return;
				const timetable = getThursday(member.teachinggroup).periodsix;
				const period = timetable.replace('opta', member.optionA).replace('optb', member.optionB).replace('optc', member.optionC).replace('optd', member.optionD);
				periodEmbed.setDescription(`Time for your next lesson! Your next lesson is ${period}, bear in mind that your meeting may not have started yet however it should be up soon!`);
				periodEmbed.setTitle(`Period 6: ${period}`);
				periodEmbed.addField('Name:', period, true);
				if (timetable.includes('opt')) periodEmbed.addField('Option Lesson:', timetable.slice(-1).toUpperCase(), true);
				client.users.cache.get(member.userid).send(periodEmbed);
			});
		}
		else if (day === 'Fri') {
			getMembers().forEach(member => {
				if (member.setup === 0) return;
				const timetable = getFriday(member.teachinggroup).periodsix;
				const period = timetable.replace('opta', member.optionA).replace('optb', member.optionB).replace('optc', member.optionC).replace('optd', member.optionD);
				periodEmbed.setDescription(`Time for your next lesson! Your next lesson is ${period}, bear in mind that your meeting may not have started yet however it should be up soon!`);
				periodEmbed.setTitle(`Period 6: ${period}`);
				periodEmbed.addField('Name:', period, true);
				if (timetable.includes('opt')) periodEmbed.addField('Option Lesson:', timetable.slice(-1).toUpperCase(), true);
				client.users.cache.get(member.userid).send(periodEmbed);
			});
		}
	}, {
		scheduled: true,
		timezone: 'Europe/London',
	});
	cron.schedule('59 14 * * 1-5', () => {
		const day = dateFormat(new Date(), 'ddd');
		console.log('End Of Day');
	}, {
		scheduled: true,
		timezone: 'Europe/London',
	});
});

module.exports = client;
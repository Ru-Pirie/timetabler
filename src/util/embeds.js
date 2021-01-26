const Discord = require('discord.js');

/**
 * @param {String} type The type of embed to send
 * @param {Object} channel The channel object (DC.js)
 * @param {String} description The body of the embed
 * @param {String} image URL of the image if any
 * @param {String} personToTag The person to tag if any
 * @param {Object} footer The object of the guild to pull footer date from
 * @param {Number} timer The time to wait before deleting the embed in seconds
 **/
module.exports.infoEmbed = async function(type, channel, description, image, personToTag, footer, timer) {
	let embedOptions;
	let embed;
	switch (type.split('-')[0]) {
	case 'client':
		embedOptions = ['#2c2b2b', '🖥️'];
		break;
	case 'error':
		embedOptions = ['#e71313', '⛔'];
		break;
	case 'database':
		embedOptions = ['#00ff91', '🌐'];
		break;
	case 'warning':
		embedOptions = ['#dff53d', '⚠️'];
		break;
	case 'ban':
		embedOptions = ['RED', '🔨'];
		break;
	case 'mute':
		embedOptions = ['RED', '🤫'];
		break;
	case 'misc':
		embedOptions = ['#2141e4', '🛠️'];
		break;
	case 'event':
		embedOptions = ['#29fff1', '📡'];
		break;
	case 'message':
		embedOptions = ['#ffffff', '*️⃣'];
		break;
	case 'permission':
		embedOptions = ['#e72eff', '🕵️'];
		break;
	case 'audit':
		embedOptions = ['#f0660a', '📌'];
		break;
	case 'success':
		embedOptions = ['GREEN', '✅'];
		break;
	case 'working':
		embedOptions = ['#f2ff00', '🛠'];
		break;
	case 'info':
		embedOptions = ['#33A5FF', 'ℹ️'];
		break;
	case 'dm':
		embedOptions = ['#be03fc', '✉'];
		break;
	case 'dmreply':
		embedOptions = ['GREEN', '✉'];
		break;
	case 'clock':
		embedOptions = ['GREEN', '⏰'];
		break;
	case 'tada':
		embedOptions = ['#be03fc', '🎉'];
		break;
	default:
	}
	const infoEmbed = new Discord.MessageEmbed()
		.setColor(embedOptions[0])
		.setDescription(`${embedOptions[1]}   ${description}`);

	if (image) infoEmbed.setThumbnail(image);
	if (footer) {
		infoEmbed.setTimestamp();
		infoEmbed.setFooter(footer.name, footer.iconURL({ format: 'png' }));
	}
	if (type.split('-')[1] === 'SEND') embed = await channel.send(personToTag ? personToTag : '', infoEmbed);
	else embed = await channel.edit(personToTag ? personToTag : '', infoEmbed);
	if (timer) embed.delete({ timeout: timer * 1000 });
	return embed;
};
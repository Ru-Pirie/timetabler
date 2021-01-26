const dateFormat = require('dateformat');
const fs = require('fs');

module.exports = {
	colours: {
		'bright': '\x1b[1m',
		'dim': '\x1b[2m',
		'reset': '\x1b[0m',
		'red': '\x1b[31m',
		'yellow': '\x1b[33m',
		'brightyellow': '\x1b[93m',
		'cyan': '\x1b[36m',
		'nonzero': '\x1b[92m',
		'nonzeromod': '\x1b[91m',
	},
	events: {
		'CLIENT': '\x1b[30m',
		'ERROR': '\x1b[31m',
		'DATABASE': '\x1b[32m',
		'WARNING': '\x1b[33m',
		'COMMAND': '\x1b[35m',
		'EVENT': '\x1b[36m',
		'MESSAGE': '\x1b[37m',
		'DM': '\x1b[37m',
	},
	/**
     * @param {String} type The event type
     * @param {String} message The message that is to be logged
     **/
	log(type, message) {
		const short = dateFormat(new Date(), 'dd-mm-yyyy');
		const date = dateFormat(new Date(), 'mmm dS h:MMtt');
		const event = `${module.exports.colours['bright']}${module.exports.events[type]}[${type}]${module.exports.colours['reset']}`;
		console.log(`${module.exports.colours['yellow']}${date}:${module.exports.colours['reset']} ${event} ${message}`);
		fs.appendFileSync(`./src/logs/${short}.txt`, `${date}: [${type}] ${message}\n`);
	},
};
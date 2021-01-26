/* eslint-disable no-prototype-builtins */
module.exports = {
	prefix: '/',
	version: '1.0.0',
	client: {
		token: 'Nzk4MTUzOTM3NTA5MTU0ODQ2.X_w4xw.oXUUHAs1TI-GvhxnFaJ2x_ezUJY',
	},
	embed: {
		image: 'https://icons-for-free.com/iconfiles/png/512/clock+galaxy+mobile+schedule+time+timetable+icon-1320183046319691941.png',
	},
	/**
     * @param {string} variable The variable you want the grab
    **/
	get(variable) {
		for (const x in module.exports) {
			if (module.exports.hasOwnProperty(x)) {
				if (x === variable) return module.exports[x];
				for (const xx in module.exports[x]) {
					if (module.exports[x].hasOwnProperty(xx)) {
						if (xx === variable) return module.exports[x][xx];
						for (const xxx in module.exports[x][xx]) {
							if (module.exports[x][xx].hasOwnProperty(xxx)) {
								if (xxx === variable) return module.exports[x][xx][xxx];
							}
						}
					}
				}
			}
		}
	},
};
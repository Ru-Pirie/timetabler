module.exports = {
	/**
     * @param {Number} ms The time in MS to sleep
    **/
	sleep: async function(ms) {
		return new Promise(resolve => setTimeout(resolve, ms));
	},
	/**
     * @param {Number} min The minimum value of the random number
     * @param {Number} max The maximum value of the random number
    **/
	getRandomArbitrary: async function(min, max) {
		const num = Math.random() * (max - min) + min;
		return num;
	},
	/**
     * @param {Number} chars The number of chars you want returned
    **/
	getUnique: async function(chars) {
		let unique;
		if (!chars || chars > 10) unique = Math.random().toString(36).slice(-10);
		else unique = Math.random().toString(36).slice(-chars);
		return unique;
	},
};
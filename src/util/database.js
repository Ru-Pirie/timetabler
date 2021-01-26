const Database = require('better-sqlite3');
const db = new Database(`${__dirname}/../database/main.db`);

module.exports = {
	/**
     * This function enters a user into the database when they join the server
     *
     * @param {string} id The id of a user to add to the db
    **/
	addMember: function(id) {
		const addSTMT = db.prepare('INSERT INTO USERS (userid) VALUES (?)');
		addSTMT.run(id);
	},
	/**
     * This function fetches if a user has settup their account
     *
     * @param {string} id The id of a user to fetch
     *
     * @returns {boolian} The true false condition depending on the settup state of the user
    **/
	getSetup: function(id) {
		const getSTMT = db.prepare('SELECT (setup) FROM USERS WHERE userid = ?');
		const setup = getSTMT.get(id);
		if (setup.setup === 0) {
			return false;
		}
		else {
			return true;
		}
	},
	/**
     * This function fetches if a user has settup their account
     *
     * @param {string} id The id of a user to changes setup
    **/
	setSetup: function(id) {
		const setSTMT = db.prepare('UPDATE USERS SET setup = ? WHERE userid = ?');
		setSTMT.run(1, id);
	},
	/**
     * This function reterns the json object of the user
     *
     * @param {string} id The id of a user to get
     *
     * @returns {object} The object of the user
    **/
	getMember: function(id) {
		const getSTMT = db.prepare('SELECT * FROM USERS WHERE userid = ?');
		const userObj = getSTMT.get(id);
		return userObj;
	},
	/**
     * This function reterns the json object of the user
     *
     * @param {string} id The id of a user to remove
    **/
	removeMember: function(id) {
		const removeSTMT = db.prepare('DELETE FROM USERS WHERE userid = ?');
		removeSTMT.run(id);
	},
	/**
     * This function adds a teaching group to a user given an id
     *
     * @param {string} id The id of the user to change teaching group
	 * @param {string} teachinggroup The teaching group to add to the user
    **/
	addGroup: function(teachinggroup, id) {
		const addSTMT = db.prepare('UPDATE USERS SET teachinggroup = ? WHERE userid = ?');
		addSTMT.run(teachinggroup, id);
	},
	/**
     * This function adds a option to a user given an id
     *
     * @param {string} id The id of the user to change teaching group
	 * @param {string} optionA The option the user has
    **/
	addOptionA: function(optionA, id) {
		const setSTMT = db.prepare('UPDATE USERS SET optionA = ? WHERE userid = ?');
		setSTMT.run(optionA, id);
	},
	/**
     * This function adds a option to a user given an id
     *
     * @param {string} id The id of the user to change teaching group
	 * @param {string} optionB The option the user has
    **/
	addOptionB: function(optionB, id) {
		const addSTMT = db.prepare('UPDATE USERS SET optionB = ? WHERE userid = ?');
		addSTMT.run(optionB, id);
	},
	/**
     * This function adds a option to a user given an id
     *
     * @param {string} id The id of the user to change teaching group
	 * @param {string} optionC The option the user has
    **/
	addOptionC: function(optionC, id) {
		const addSTMT = db.prepare('UPDATE USERS SET optionC = ? WHERE userid = ?');
		addSTMT.run(optionC, id);
	},
	/**
     * This function adds a option to a user given an id
     *
     * @param {string} id The id of the user to change teaching group
	 * @param {string} optionD The option the user has
    **/
	addOptionD: function(optionD, id) {
		const addSTMT = db.prepare('UPDATE USERS SET optionD = ? WHERE userid = ?');
		addSTMT.run(optionD, id);
	},
	/**
     * This function fetches a timetable given a teaching group
     *
     * @param {string} teachinggroup The teaching group timetable you wish to fetch
    **/
	getMonday: function(teachinggroup) {
		const getSTMT = db.prepare('SELECT * FROM MONDAY WHERE teachinggroup = ?');
		const timetableObj = getSTMT.get(teachinggroup);
		return timetableObj;
	},
	/**
     * This function fetches a timetable given a teaching group
     *
     * @param {string} teachinggroup The teaching group timetable you wish to fetch
    **/
	getTuesday: function(teachinggroup) {
		const getSTMT = db.prepare('SELECT * FROM TUESDAY WHERE teachinggroup = ?');
		const timetableObj = getSTMT.get(teachinggroup);
		return timetableObj;
	},
	/**
     * This function fetches a timetable given a teaching group
     *
     * @param {string} teachinggroup The teaching group timetable you wish to fetch
    **/
	getWednesday: function(teachinggroup) {
		const getSTMT = db.prepare('SELECT * FROM WEDNESDAY WHERE teachinggroup = ?');
		const timetableObj = getSTMT.get(teachinggroup);
		return timetableObj;
	},
	/**
     * This function fetches a timetable given a teaching group
     *
     * @param {string} teachinggroup The teaching group timetable you wish to fetch
    **/
	getThursday: function(teachinggroup) {
		const getSTMT = db.prepare('SELECT * FROM THRUSDAY WHERE teachinggroup = ?');
		const timetableObj = getSTMT.get(teachinggroup);
		return timetableObj;
	},
	/**
     * This function fetches a timetable given a teaching group
     *
     * @param {string} teachinggroup The teaching group timetable you wish to fetch
    **/
	getFriday: function(teachinggroup) {
		const getSTMT = db.prepare('SELECT * FROM FRIDAY WHERE teachinggroup = ?');
		const timetableObj = getSTMT.get(teachinggroup);
		return timetableObj;
	},
	/**
     * Returns all users in the USERS table
     *
	 * @returns {array} An array containing all of the users in the USERS table in the main db
    **/
	getMembers: function() {
		const getSTMT = db.prepare('SELECT * FROM USERS');
		const usersArray = getSTMT.all();
		return usersArray;
	},
};
const Sequelize = require('sequelize');

const sequelize = new Sequelize('bank_system_db', 'root', 'root', {
	host: '127.0.0.1',
	dialect: 'mysql',
	dialectOptions: {
		supportBigNumbers: true
	},
	pool: {
		max: 5,
		min: 0,
		idle: 10000
	}
});

module.exports = sequelize;
const sequelize = require('../../index');
const Sequelize = require('sequelize');
const City = require('../cities');
const Country = require('../countries');
const DisabilityGroup = require('../disability_groups');
const MaritalStatus = require('../marital_statuses');

const Client = sequelize.define('client', {
	id: {
		type: Sequelize.INTEGER,
		field: 'client_id',
		primaryKey: true,
		autoIncrement: true
	},
	name: {
		type: Sequelize.STRING,
        allowNull: false
	},
	surname: {
		type: Sequelize.STRING,
        allowNull: false
	},
	patronymic: {
		type: Sequelize.STRING,
        allowNull: false
	},
	birthDate: {
		type: Sequelize.DATE,
		field: 'birth_date',
		allowNull: false
	},
    gender: {
        type: Sequelize.ENUM('женский', 'мужской'),
        allowNull: false
	},
    passportSeries: {
		type: Sequelize.STRING,
		field: 'passport_series',
		allowNull: false
	},
    passportNumber: {
		type: Sequelize.STRING,
		field: 'passport_number',
		allowNull: false
	},
    issuingAuthority: {
		type: Sequelize.STRING,
		field: 'issuing_authority',
		allowNull: false
	},
    issueDate: {
		type: Sequelize.DATE,
		field: 'issue_date',
		allowNull: false
	},
    identificationNumber: {
		type: Sequelize.STRING,
		field: 'identification_number',
		allowNull: false
	},
    birthPlace: {
		type: Sequelize.STRING,
		field: 'birth_place',
		allowNull: false
	},
    residenceCity: {
		type: Sequelize.INTEGER,
		field: 'residence_city',
		allowNull: false
	},
    residenceAddress: {
		type: Sequelize.STRING,
		field: 'residence_address',
		allowNull: false
	},
    homePhoneNumber: {
		type: Sequelize.STRING,
		field: 'home_phone_number'
	},
    mobilePhoneNumber: {
		type: Sequelize.STRING,
		field: 'mobile_phone_number'
	},
	email: {
		type: Sequelize.TEXT
	},
    maritalStatus: {
		type: Sequelize.INTEGER,
		field: 'marital_status',
		allowNull: false
	},
    citizenship: {
		type: Sequelize.INTEGER,
		allowNull: false
	},
    disability: {
        type: Sequelize.INTEGER,
        allowNull: false
	},
    isRetired: {
		type: Sequelize.BOOLEAN,
		field: 'is_retired',
		allowNull: false
	},
    monthlyIncome: {
		type: Sequelize.FLOAT,
		field: 'monthly_income'
	},
    isReservist: {
		type: Sequelize.BOOLEAN,
		field: 'is_reservist',
		allowNull: false
	}
}, {
	freezeTableName: true,
	createdAt: false,
	updatedAt: false
});

Client.belongsTo(City, { foreignKey: 'residence_city'});
Client.belongsTo(MaritalStatus, { foreignKey: 'marital_status'});
Client.belongsTo(Country, { foreignKey: 'citizenship'});
Client.belongsTo(DisabilityGroup, { foreignKey: 'disability'});


module.exports = Pupil;
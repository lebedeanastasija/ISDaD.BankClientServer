const sequelize = require('../../index');
const Sequelize = require('sequelize');

const MaritalStatus = sequelize.define('marital_status', {
	id: {
		type: Sequelize.INTEGER,
		field: 'marital_status_id',
		primaryKey: true,
		autoIncrement: true
	},
	name: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
	gender: {
        type: Sequelize.ENUM('женский', 'мужской'),
        allowNull: false
    }
}, {
    freezeTableName: true,
    createdAt: false,
    updatedAt: false,
});

/*
Class.belongsTo(Teacher, { foreignKey: 'teacher_id' });*/

module.exports = MaritalStatus;
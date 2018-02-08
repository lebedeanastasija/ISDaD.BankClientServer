const sequelize = require('../../index');
const Sequelize = require('sequelize');

const DisabilityGroup = sequelize.define('disability_group', {
    id: {
        type: Sequelize.INTEGER,
        field: 'disability_group_id',
        primaryKey: true,
        autoIncrement: true
    },
    number: {
        type: Sequelize.ENUM('1','2','3','0'),
        unique: true,
        allowNull: false
    }
}, {
    freezeTableName: true,
    createdAt: false,
    updatedAt: false,
});

module.exports = DisabilityGroup;
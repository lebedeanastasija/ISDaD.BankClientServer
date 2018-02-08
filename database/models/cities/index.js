const sequelize = require('../../index');
const Sequelize = require('sequelize');

const City = sequelize.define('city', {
    id: {
        type: Sequelize.INTEGER,
        field: 'city_id',
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    }
}, {
    freezeTableName: true,
    createdAt: false,
    updatedAt: false,
});

module.exports = City;
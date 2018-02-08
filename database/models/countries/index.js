const sequelize = require('../../index');
const Sequelize = require('sequelize');

const Country = sequelize.define('country', {
    id: {
        type: Sequelize.INTEGER,
        field: 'country_id',
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    code2: {
        type: Sequelize.STRING,
        unique: true
    },
    code3: {
        type: Sequelize.STRING,
        unique: true
    }
}, {
    freezeTableName: true,
    createdAt: false,
    updatedAt: false,
});

module.exports = Country;
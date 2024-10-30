const { DataTypes } = require('sequelize');
const sequelize = require('../database/database');

const Category = sequelize.define('categories', {
	title: {
		type: DataTypes.STRING,
		allowNull: false
	}
}, {
	underscored: true
});

module.exports = Category;

const { DataTypes } = require('sequelize');
const sequelize = require('../database/database');
const Category = require('./category');

const Task = sequelize.define('tasks', {
	title: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	done: {
		type: DataTypes.BOOLEAN,
		allowNull: false,
		defaultValue: false
	}
}, {
	underscored: true
});

Task.belongsTo(Category, {
	foreignKey: 'category_id',
	targetKey: 'id',
	onDelete: 'CASCADE'
});

module.exports = Task;

const Task = require('../models/task');

async function get(req, res) {
	const tasks = await Task.findAll();

	res.json({ data: tasks });
}

module.exports = {
	get
};

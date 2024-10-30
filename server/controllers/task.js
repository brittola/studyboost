const Task = require('../models/task');

async function get(req, res) {
	const tasks = await Task.findAll();

	res.json({ data: tasks });
}

async function create(req, res) {
	const { title, done } = req.body;

	if (!title) {
		return res.status(400).json({ message: 'O campo title é obrigatório' });
	}

	const task = await Task.create({ title, done });

	return res.status(201).json(task);
}

async function update(req, res) {
	const { id } = req.params;
	const { title, done } = req.body;

	if (!title) {
		return res.status(400).json({ message: 'O campo title é obrigatório' });
	}

	const task = await Task.findByPk(id);

	if (!task) {
		return res.status(404).json({ message: 'Tarefa não encontrada' });
	}

	task.title = title;
	task.done = done;

	await task.save();

	return res.json(task);
}

async function remove(req, res) {
	const { id } = req.params;

	const task = await Task.findByPk(id);

	if (!task) {
		return res.status(404).json({ message: 'Tarefa não encontrada' });
	}

	await task.destroy();

	return res.status(204).send();
}

module.exports = {
	get,
	create,
	update,
	remove
};

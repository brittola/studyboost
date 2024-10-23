const Category = require('../models/category');

async function create(req, res) {
	const { title } = req.body;

	if (!title) {
		return res.status(400).json({ message: 'O campo title é obrigatório' });
	}

	const category = await Category.create({ title });

	return res.status(201).json(category);
}

module.exports = {
	create
}

const express = require('express');
const app = express();

const taskController = require('./controllers/task');
const categoryController = require('./controllers/category');

const database = require('./database/database');
const Task = require('./models/task');
const Category = require('./models/category');

require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/tasks', taskController.get);

app.post('/categories', categoryController.create);

database.sync().then(async () => {
	await Task.sync({ force: false });
	await Category.sync({ force: false });

	app.listen(process.env.PORT, () => {
	  console.log('Server listening on port ' + process.env.PORT);
	});
}).catch((error) => {
    console.error('Erro ao sincronizar o banco de dados:', error);
});

const {ObjectId} = require("mongodb");
const express = require("express");
const bodyParser = require("body-parser");

const {mongoose} = require("./db/mongoose");
const {Todo} = require("./models/todo");

// In case i test it somewhere than local - Heroku for instance - i set 'port' variable to the 'env' default port
const port = process.env.PORT || 3000;

const app = express();

app.use(bodyParser.json());

/* eslint-disable */

// Create one todo and save to the database
app.post("/todos", (req, res) => {
	const todo = new Todo({
		text: req.body.text
	});

	todo.save().then((doc) => {
		res.send(doc);
	}).catch((err) => {
		res.status(400).send(err);
	});
});

// List all todos in the database
app.get("/todos", (req, res) => {
	Todo.find({}).then((todos) => {
		res.send({todos});
	}).catch((err) => {
		res.status(400).send(err);
	});
});

// Search for one particular todo by id
app.get("/todos/:id", (req, res) => {
	const id = req.params.id;
	if (!ObjectId.isValid(id)) {
		return res.status(404).send(`ID ${id} is invalid`);
	}
	Todo.findById(id).then((todo) => {
		if (!todo) {
			return res.status(404).send(`No todo found with id ${id}`);
		}
		res.send(todo);
	}).catch((err) => {
		res.status(400).send(err);
	});
});

app.listen(port, () => {
	console.log(`Server is set up on port ${port}`);
});

module.exports = {app};
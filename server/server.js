require("./config/config");

const _ = require("lodash");
const {ObjectId} = require("mongodb");
const express = require("express");
const bodyParser = require("body-parser");

/* eslint-disable */
const {mongoose} = require("./db/mongoose");
/* eslint-enable */

const {Todo} = require("./models/todo");

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

// Delete one particular todo by id
app.delete("/todos/:id", (req, res) => {
	const id = req.params.id;
	if (!ObjectId.isValid(id)) {
		return res.status(404).send(`ID ${id} is invalid`);
	}
	Todo.findByIdAndRemove(id).then((todo) => {
		if (!todo) {
			return res.status(404).send(`No todo found with id ${id}`);
		}
		res.send(todo);
	}).catch((err) => {
		res.status(400).send(err);
	});
});

// Update one particular todo by id
app.patch("/todos/:id", (req, res) => {
	const id = req.params.id;
	const body = _.pick(req.body, ["text", "completed"]);

	if (!ObjectId.isValid(id)) {
		return res.status(404).send(`ID ${id} is invalid`);
	}
	if (_.isBoolean(body.completed) && body.completed) {
		body.completedAt = new Date().getTime();
	} else {
		body.completed = false;
		body.completedAt = null;
	}
	Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
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
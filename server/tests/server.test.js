/* eslint-env node, mocha */
/* eslint-disable import/no-dynamic-require */


const expect = require("expect");
const request = require("supertest");
const {ObjectId} = require("mongodb");

const {app} = require("./../server");
const {Todo} = require("./../models/todo");

const todos = [{
	_id: new ObjectId,
	text: "First todo"
}, {
	_id: new ObjectId,
	text: "Second todo"
}];

beforeEach((done) => {
	Todo.remove({}).then(() => {
		Todo.insertMany(todos);
	}).then(() => done());
});

describe("Test of POST /todos", () => {
	it("should create a new todo", (done) => {
		const text = "This is a test case";

		request(app)
			.post("/todos")
			.send({
				text
			})
			.expect(200)
			.expect((res) => {
				expect(res.body.text).toBe(text);
			})
			.end((err, res) => {
				if (err) {
					return done(err);
				}

				Todo.find({text}).then((todos) => {
					expect(todos.length).toBe(1);
					expect(todos[0].text).toBe(text);
					done();
				}).catch((e) => {
					done(e);
				});
			});
	});

	it("should not create todo with invalid body data", (done) => {
		request(app)
			.post("/todos")
			.send({})
			.expect(400)
			.end((err, res) => {
				if (err) {
					return done(err);
				}

				Todo.find().then((todos) => {
					expect(todos.length).toBe(2);
					done();
				}).catch((e) => done(e));
			});
	});
});

describe("Test of GET /todos", () => {
	it("should return the todos list", (done) => {
		request(app)
			.get("/todos")
			.send()
			.expect(200)
			.expect((res) => {
				expect(res.body.todos.length).toBe(2);
			})
			.end((err, res) => {
				if (err) {
					return done(err);
				}
			});
		done();
	});
});

describe("Test of GET /todos/:id", () => {
	it("should return the todo which ID was indicated", (done) => {
		request(app)
			.get(`/todos/${todos[0]._id}`)
			.send()
			.expect(200)
			.expect((res) => {
				expect(res.body.text).toBe(todos[0].text);
			})
			.end((err, res) => {
				if (err) {
					return done(err);
				}
			});
		done();
	});

	it("should return 404 for bad ID", (done) => {
		const id = 123;
		request(app)
			.get(`/todos/${id}`)
			.send()
			.expect(404)
			.expect((res) => {
				expect(res.text).toBe(`ID ${id} is invalid`);
			})
			.end((err, res) => {
				if (err) {
					return done(err);
				}
			});
		done();
	});

	it("should return 404 for inexistant ID", (done) => {
		const id = "000000000000000000000000";
		request(app)
			.get(`/todos/${id}`)
			.send()
			.expect(404)
			.expect((res) => {
				expect(res.text).toBe(`No todo found with id ${id}`);
			})
			.end((err, res) => {
				if (err) {
					return done(err);
				}
			});
		done();
	});
});
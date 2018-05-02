/* eslint-env node, mocha */
/* eslint-disable import/no-dynamic-require */


const expect = require("expect");
const request = require("supertest");

const {app} = require("./../server");
const {Todo} = require("./../models/todo");

const todos = [{
	text: "First todo"
}, {
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
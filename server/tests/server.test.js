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
	text: "Second todo",
	completed: true,
	completedAt: 333
}];


beforeEach((done) => {
	Todo.insertMany(todos).then(() => done()).catch((err) => done(err));
});

describe("Test of POST /todos : Create todo", () => {
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
			.end((err) => {
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
			.end((err) => {
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

describe("Test of GET /todos : List todos", () => {
	it("should return the todos list", (done) => {
		request(app)
			.get("/todos")
			.send()
			.expect(200)
			.expect((res) => {
				expect(res.body.todos.length).toBe(2);
				done();
			})
			.catch((err) => {
				done(err);
			});
	});
});

describe("Test of GET /todos/:id : Search todo by ID", () => {
	it("should return the todo which ID was indicated", (done) => {
		request(app)
			.get(`/todos/${todos[0]._id}`)
			.send()
			.expect(200)
			.expect((res) => {
				expect(res.body.text).toBe(todos[0].text);
				done();
			})
			.catch((err) => {
				done(err);
			});
	});

	it("should return 404 for bad ID", (done) => {
		const id = 123;
		request(app)
			.get(`/todos/${id}`)
			.send()
			.expect(404)
			.expect((res) => {
				expect(res.text).toBe(`ID ${id} is invalid`);
				done();
			})
			.catch((err) => {
				done(err);
			});
	});

	it("should return 404 for inexistant ID", (done) => {
		const id = "000000000000000000000000";
		request(app)
			.get(`/todos/${id}`)
			.send()
			.expect(404)
			.expect((res) => {
				expect(res.text).toBe(`No todo found with id ${id}`);
				done();
			})
			.catch((err) => {
				done(err);
			});
	});
});

describe("Test of DELETE /todos/:id : Remove todo by ID", () => {
	it("should return the todo which ID was indicated", (done) => {
		request(app)
			.delete(`/todos/${todos[0]._id}`)
			.send()
			.expect(200)
			.expect((res) => {
				expect(res.body.text).toBe(todos[0].text);
				done();
			})
			.catch((err) => {
				done(err);
			});
	});

	it("should return 404 for bad ID", (done) => {
		const id = 123;
		request(app)
			.get(`/todos/${id}`)
			.send()
			.expect(404)
			.expect((res) => {
				expect(res.text).toBe(`ID ${id} is invalid`);
				done();
			})
			.catch((err) => {
				done(err);
			});
	});

	it("should return 404 for inexistant ID", (done) => {
		const id = "000000000000000000000000";
		request(app)
			.get(`/todos/${id}`)
			.send()
			.expect(404)
			.expect((res) => {
				expect(res.text).toBe(`No todo found with id ${id}`);
				done();
			})
			.catch((err) => {
				done(err);
			});
	});
});

describe("Test of PATCH /todos/:id : Update todo by ID", () => {
	it("should update the todo which ID was indicated", (done) => {
		const text = "First todo, updated version";

		request(app)
			.patch(`/todos/${todos[0]._id}`)
			.send({
				completed: true,
				text: text
			})
			.expect(200)
			.expect((res) => {
				expect(res.body.text).toBe(text);
				expect(res.body.completed).toBe(true);
				expect(typeof res.body.completedAt).toBe("number");
				done();
			})
			.catch((err) => {
				done(err);
			});
	});

	it("should clear *completedAt* when todo is not completed", (done) => {
		const text = "Second todo, updated version";

		request(app)
			.patch(`/todos/${todos[1]._id}`)
			.send({
				completed: false,
				text: text
			})
			.expect(200)
			.expect((res) => {
				expect(res.body.text).toBe(text);
				expect(res.body.completed).toBe(false);
				expect(res.body.completedAt).toBe(null);
				done();
			})
			.catch((err) => {
				done(err);
			});
	});

	it("should return 404 for bad ID", (done) => {
		const id = 123;
		request(app)
			.patch(`/todos/${id}`)
			.send()
			.expect(404)
			.expect((res) => {
				expect(res.text).toBe(`ID ${id} is invalid`);
				done();
			})
			.catch((err) => {
				done(err);
			});
	});

	it("should return 404 for inexistant ID", (done) => {
		const id = "000000000000000000000000";
		request(app)
			.patch(`/todos/${id}`)
			.send()
			.expect(404)
			.expect((res) => {
				expect(res.text).toBe(`No todo found with id ${id}`);
				done();
			})
			.catch((err) => {
				done(err);
			});
	});
});

afterEach((done) => {
	Todo.remove({}).then(() => done()).catch((err) => done(err));
});
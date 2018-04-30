// const MongoClient = require("mongodb").MongoClient;
const {MongoClient, ObjectId} = require("mongodb");

const blabla = new ObjectId();
/* eslint-disable*/
console.log(blabla);
/* eslint-enable*/

MongoClient.connect("mongodb://localhost:27017/TodoApp", (error, client) => {
	if (error) {
		/* eslint-disable */
		return console.log("Connection failed !");
	}
	console.log("Successfully connected");
	const db = client.db("TodoApp");
	/* db.collection("Todos").insertOne({
		text: "This is some new text",
		completed: false
	}, (error, result) => {
		if (error) {
			return console.log("Insertion failed");
		}
		console.log(JSON.stringify(result.ops, undefined, 2));
	}); */

	/* db.collection("Users").insertOne({
		name: {
			_id: 12345,
			first: "Othniel",
			last: "Adopo"
		},
		location: "Cocody",
		age: 19
	}, (error, result) => {
		if (error) {
			return console.log("Insertion failed");
		}
		console.log(result.ops[0]._id.getTimestamp());
	}); */
	/* eslint-enable */
	client.close();
});
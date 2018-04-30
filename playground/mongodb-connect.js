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

	db.collection("Users").insertOne({
		_id: 12345,
		name: {
			first: "Yorim",
			last: "Adopo"
		},
		location: "Cocody",
		age: 14
	}, (error, result) => {
		if (error) {
			return console.log("Insertion failed");
		}
		console.log(result.ops);
	});
	/* eslint-enable */
	client.close();
});
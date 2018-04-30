// const MongoClient = require("mongodb").MongoClient;
const {MongoClient} = require("mongodb");

MongoClient.connect("mongodb://localhost:27017/TodoApp", (error, client) => {
	if (error) {
		/* eslint-disable */
		return console.log("Connection failed !");
	}
	console.log("Successfully connected");
	const db = client.db("TodoApp");
	
	/* db.collection("Todos").find({completed: true}).toArray().then((docs) => {
		console.log("--------------------");
		console.log("Todos collection");
		console.log("--------------------");
		console.log("--------------------");
		console.log(JSON.stringify(docs, undefined, 2));
		console.log("--------------------");
	}).catch((err) => {
		console.log("Unable to fetch docs");
	}); */

	db.collection("Todos").find({completed: true}).count().then((count) => {
		console.log("--------------------");
		console.log(`Todos count : ${count}`);
		console.log("--------------------");
	}).catch((err) => {
		console.log("Unable to count docs");
	});
	/* eslint-enable */
	client.close();
});
const {MongoClient} = require("mongodb");

MongoClient.connect("mongodb://localhost:27017/TodoApp", (error, client) => {
	if (error) {
		/* eslint-disable */
		return console.log("Connection failed !");
	}
	console.log("Successfully connected");
	const db = client.db("TodoApp");

	// deleteMany
	/* db.collection("Todos").deleteMany({text: "I'm here"}).then((result) => {
		console.log(result);
	}).catch((err) => {
		console.log("Can't delete docs");
	}); */

	// deleteOne
/* 	db.collection("Todos").deleteOne({
		text: "I'm here"
	}).then((result) => {
		console.log(result);
	}).catch((err) => {
		console.log("Can't delete docs");
	}); */

	// findOneAndDelete
		/* db.collection("Todos").findOneAndDelete({
			completed: true
		}).then((result) => {
			console.log(result);
		}).catch((err) => {
			console.log("Can't delete docs");
		}); */
		

	/* eslint-enable */
	client.close();
});
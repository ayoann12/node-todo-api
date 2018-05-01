const {
	MongoClient,
	ObjectId
} = require("mongodb");

MongoClient.connect("mongodb://localhost:27017/TodoApp", (error, client) => {
	if (error) {
		/* eslint-disable */
		return console.log("Connection failed !");
	}
	console.log("Successfully connected");
	const db = client.db("TodoApp");

	db.collection("Todos").findOneAndUpdate({
		_id: new ObjectId("5ae6debf9a44710b54b5d5dc")
	}, {
		$set: {
			completed: true
		}
	}, {
		returnOriginal: false
	}).then((result) => {
		console.log(result);
	}).catch((err) => {
		console.log("Can't delete docs");
	});

	db.collection("Users").findOneAndUpdate({
		_id: new ObjectId("5ae6e0800032e426ecfa475a")
	}, {
			$set: {
				location: "Hay Riad"
			},
			$inc: {
				age: 1
			}
		}, {
			returnOriginal: false
		}).then((result) => {
			console.log(result);
		}).catch((err) => {
			console.log("Can't delete docs");
		});


	/* eslint-enable */
	client.close();
});
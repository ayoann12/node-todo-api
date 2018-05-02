const {ObjectId} = require("mongodb");
const {mongoose} = require("./../server/db/mongoose");
const {Todo} = require("./../server/models/todo");

const id = "5ae9808f5c62ad0eb052d34a";

if (!ObjectId.isValid(id)) {
	console.log("ID is not correct !!!");
}
Todo.find({
	_id: id
}).then((todos) => {
	console.log(`Todos : ${todos}`);
});

Todo.findOne({
	_id: id
}).then((todo) => {
	console.log(`Todo : ${todo}`);
});

Todo.findById(id).then((todo) => {
	if (!todo) {
		console.log(`None todo found with id ${id}`);
	}
	console.log(`Todo by id : ${todo}`);
}).catch((err) => console.log(err));
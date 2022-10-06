const Todo = require('../models/todo');
module.exports.getList = async (req, res) => {
    try {
        const todo = await Todo.find();
        res.json(todo);
    } catch (error) {
        console.log('error in getList ' + error);
    }
}
module.exports.addTask = (req, res) => {
    try {
        const todo = new Todo({
            activity: req.body.activity,
            date: req.body.date

        })
        todo.save();
        res.json(todo);
    } catch (error) {
        console.log('error in addTask ' + error);
    }
}
module.exports.deleteTask = async (req, res) => {
    try {
        const result = await Todo.findByIdAndDelete(req.params.id);
        res.json(result);
    } catch (error) {
        console.log('error in deleteTask ' + error);
    }
}
module.exports.completeStatus = async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);
        todo.complete = !todo.complete;
        todo.save();
        res.json(todo);
    } catch (error) {
        console.log('error in completeStatus ' + error);
    }
}
module.exports.updateTask = async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);
        todo.activity = req.body.activity;
        todo.save();
        res.json(todo);
    } catch (error) {
        console.log('error in updateTask ' + error);
    }
}


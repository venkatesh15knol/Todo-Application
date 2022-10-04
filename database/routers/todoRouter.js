const express = require('express');
const todoRouter = express.Router();
const {getList, addTask, deleteTask, completeStatus, updateTask}=require('../controller/todoController');
todoRouter.route('/todos').get(getList);
todoRouter.route('/todo/new').post(addTask);
todoRouter.route('/todo/:id').delete(deleteTask);
todoRouter.route('/todo/:id').put(completeStatus);
todoRouter.route('/todo/:id/update').put(updateTask);
module.exports=todoRouter;
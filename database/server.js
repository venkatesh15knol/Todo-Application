const express = require('express');
const mongoose = require('mongoose');
const cors=require('cors');
const todoRouter=require('./routers/todoRouter');
const app=express();
app.use(express.json());
app.use(cors());
mongoose
	.connect("mongodb://localhost:27017/Todo-data", { 
        useNewUrlParser: true,
        useUnifiedTopology:true })
	.then(() => console.log('mongodb Connected'))
    .catch((err)=>console.log(err));

app.use(todoRouter);
app.listen(4000,()=>{
    console.log('server is listening on port 4000');
})
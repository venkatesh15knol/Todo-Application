import React, { useState, useContext,  useEffect } from "react";
import { TodoContext } from "./App";
const Input = (props) => {
    const [task, setTask] = useState('');
    const [time, setTime] = useState('');
    const data = useContext(TodoContext);
    const { changeFilter, filterState, setfilterState, newList, setnewList } = data;
    useEffect(()=>{
       changeFilter();
    },[newList])
    const addTask = async () => {
        if (task !== "" && time !== "") {
            const result = await fetch("http://localhost:4000/todo/new", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    activity: task,
                    date: time
                })
            }).then(res => res.json());
            const arr = [...newList, result];
            arr.sort((a, b) => {
                return new Date(a.date) - new Date(b.date);
            })
            setnewList([...arr]);
        }
        else {
            alert('Enter correct details');
        }
    }
    return (
        <>
            <div className="inputField" key={2344}>
                <label>Enter task: </label>
                <input type='text' value={task} onChange={(e) => setTask(e.target.value)} className="activity" />
                <br />
                <br />
                <label>Enter date:  </label>
                <input type='date' value={time} onChange={(e) => setTime(e.target.value)} />
                <button onClick={addTask}>Add</button>
                <div className="filter">
                    <label>Filter: </label>
                    <select value={filterState} onChange={(e)=>setfilterState(e.target.value)}>
                        <option value="select">select Option</option>
                        <option value="all">All</option>
                        <option value="completed">Completed</option>
                        <option value="pending">Pending</option>
                    </select>
                    <button onClick={changeFilter}>Filter</button>
                </div>
            </div>
        </>
    )
}
export default Input;
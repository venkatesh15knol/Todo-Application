import React, { useState,useContext,useEffect } from "react";
import { TodoContext } from "./App";
const UpdateInput = (props) => {
    const [newTask,setNewTask]=useState('');
    const {listEle}=props;
    const data=useContext(TodoContext);
    const {setId,updateId,newList, changeFilter}=data;
    useEffect(()=>{
        changeFilter();
     },[newList])
    const updateTask = async (uid) => {
        if (newTask !== '') {
            const result = await fetch('http://localhost:4000/todo/' + uid+'/update', {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    activity: newTask
                })
            }).then(res => res.json());
            const arr = newList.findIndex((e => e._id === uid));
            newList[arr].activity = result.activity;
            setId('')
        }
        else {
            alert('Enter correct details')
        }
    }
    return (
        <div className="incomplete" style={{backgroundColor:"rgb(108, 196, 152)"}} key={listEle._id}>
            <label>Enter task: </label>
            <input type="text" className="activity" onChange={(e) => setNewTask(e.target.value)} value={newTask} style={{ width: "200px" }} />
            <div className="icons">
                <i className="ri-check-fill" onClick={() => updateTask(listEle._id)}></i>
                <i className="ri-close-circle-fill" onClick={() => updateId(listEle._id)}></i>
            </div>
        </div>
    )
}
export default UpdateInput
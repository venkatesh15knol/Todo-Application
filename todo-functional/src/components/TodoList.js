import React,{useContext, useEffect} from "react";
import { TodoContext } from "./App";
const TodoList = (props) => {
    const data=useContext(TodoContext);
    const {updateId,newList,setnewList, changeFilter}=data;
    const {listEle} = props;
    useEffect(()=>{
        changeFilter();
     },[newList])
    const deleteTask = async (uid) => {
        const result = await fetch('http://localhost:4000/todo/' + uid, { method: "DELETE" }).then(res => res.json());
        setnewList(ele => ele.filter(e => e._id !== result._id));
    
    }
    const changeStatus = async (uid) => {
        const result = await fetch('http://localhost:4000/todo/' + uid,{method:"PUT"})
            .then(res => res.json());
        const arr = [...newList];
        const arr1=arr.findIndex(e=>e._id===uid);
        arr[arr1].complete=result.complete;
        setnewList([...arr]);
       
    }
    return (
        <div className="incomplete" key={listEle._id} style={listEle.complete?{backgroundColor: "rgb(143, 156, 150)",textDecoration:"line-through"}:{backgroundColor: "rgb(108, 196, 152)"}}>
            <div id="icon"><i className={listEle.complete ? "ri-checkbox-circle-fill" : "ri-checkbox-circle-line"} onClick={() => changeStatus(listEle._id)}></i></div>
            <div className="text">{listEle.activity}</div>
            <span className="text" id="date">{new Date(listEle.date).toDateString()}</span>
            <div className="icons">
                <i className="ri-close-circle-fill" onClick={() => deleteTask(listEle._id)}></i>
                <i className="ri-edit-2-fill" onClick={() => updateId(listEle._id)}></i>
            </div>
        </div>
    )
}
export default TodoList;
import React, {useState, useContext} from "react";
import UpdateInput from "./updateInput";
import TodoList from "./TodoList";
import { TodoContext } from "./App";
const DisplayData=(props)=>{
    const [id,setId]=useState('');
    const data=useContext(TodoContext);
    const {List}=data;
    const updateId = (uid) => {
        if (id === '') {
            setId(uid);
        }
        else {
            setId('');
        }
    }
    return(
        <TodoContext.Provider value={{...data,setId:setId, updateId:updateId }}>
            <div className="list">
        {List.map((ele) => (
            id === ele._id ?
            <UpdateInput listEle={ele} key={ele._id}/> :
            <TodoList listEle={ele} key={ele._id}/>
        ))}
    </div>
        </TodoContext.Provider>
    )
}
export default DisplayData;
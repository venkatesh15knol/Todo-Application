import React, { useState, useEffect } from "react";
import axios from "axios";
import Input from "./Input";
import DisplayData from "./Display";
import { TodoContext } from "./App";
const Todo = () => {
    const [List, setList] = useState([]);
    const [newList,setnewList]=useState([]);
    const [filterState, setfilterState]=useState('');
    useEffect(() => {
        async function fetchData() {
            const result = await axios.get('http://localhost:4000/todos');
            result.data.sort((a, b) => {
                return new Date(a.date) - new Date(b.date);
            })
            setList(result.data);
            setnewList(result.data);
        }
        fetchData();
    }, [])
    const changeFilter=()=>{
        if(filterState==='completed'){
            const arr=newList.filter(e=> e.complete);
            setList([...arr]);
        }
        else if(filterState==='pending'){
            const arr=newList.filter(e=>!e.complete);
            setList([...arr]);
        }
        else{
            setList([...newList])
        }
    }
    return (
        <TodoContext.Provider value={{List:List,setList:setList,filterState:filterState, setfilterState:setfilterState, newList:newList, setnewList:setnewList, changeFilter:changeFilter}}>
            <div className="dataBox">
                <Input/>
                <DisplayData/>
            </div>
        </TodoContext.Provider>
    )
}
export default Todo;
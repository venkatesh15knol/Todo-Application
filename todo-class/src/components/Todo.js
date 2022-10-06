import React from "react";
import axios from "axios";
import Input from "./Input";
import DisplayData from "./Display";
class Todo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            List: [],
            newList: [],
            filterState: ''
        };
    }
    async componentDidMount() {

        const result = await axios.get('http://localhost:4000/todos');
        result.data.sort((a, b) => {
            return new Date(a.date) - new Date(b.date);
        })
        this.insertData(result.data);
        this.newlistData(result.data);
    }
    insertData = (data) => {
        this.setState({ List: data });
    }
    newlistData=(data)=>{
        this.setState({newList: data});
    }
    changeFilter=(data)=>{
        this.setState({filterState:data});
    }
    changeData=()=>{
        if(this.state.filterState==='completed'){
            const arr=this.state.newList.filter(e=> e.complete);
            this.insertData([...arr]);
        }
        else if(this.state.filterState==='pending'){
            const arr=this.state.newList.filter(e=>!e.complete);
            this.insertData([...arr]);
        }
        else{
            this.insertData([...this.state.newList])
        }
    }
    render() {
        return (
            <div className="dataBox">
                <Input List={this.state.List} insertData={this.insertData} newList={this.state.newList} newlistData={this.newlistData} changeData={this.changeData} changeFilter={this.changeFilter}/>
                <DisplayData List={this.state.List} insertData={this.insertData} newList={this.state.newList} newlistData={this.newlistData} changeData={this.changeData} filterState={this.state.filterState}/>
            </div>
        )
    }
}
export default Todo;
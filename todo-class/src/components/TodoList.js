import React from "react";
class TodoList extends React.Component {
    constructor(props) {
        super(props);
        this.state={};
    }
    deleteTask = async (uid) => {
        const result = await fetch('http://localhost:4000/todo/' + uid, { method: "DELETE" }).then(res => res.json());
        let arr=[...this.props.newList];
        arr=arr.filter(e=>e._id!==result._id);
        this.props.newlistData([...arr]);
    }
    changeStatus = async (uid) => {
        const result = await fetch('http://localhost:4000/todo/' + uid,{method:"PUT"})
            .then(res => res.json());
        const arr = [...this.props.newList];
        const arr1=arr.findIndex(e=>e._id===uid);
        arr[arr1].complete=result.complete;
        this.props.newlistData([...arr]);
       
    }
    componentDidUpdate(prevProps){
        if(prevProps.newList!==this.props.newList){
            this.props.changeData()
        }
    }
    render() {
        return (
            <div className="incomplete" key={this.props.listEle._id} style={this.props.listEle.complete ? { backgroundColor: "rgb(143, 156, 150)", textDecoration: "line-through" } : { backgroundColor: "rgb(108, 196, 152)" }}>
                <div id="icon"><i className={this.props.listEle.complete ? "ri-checkbox-circle-fill" : "ri-checkbox-circle-line"} onClick={() => this.changeStatus(this.props.listEle._id)}></i></div>
                <div className="text">{this.props.listEle.activity}</div>
                <span className="text" id="date">{new Date(this.props.listEle.date).toDateString()}</span>
                <div className="icons">
                    <i className="ri-close-circle-fill" onClick={() => this.deleteTask(this.props.listEle._id)}></i>
                    <i className="ri-edit-2-fill" onClick={() => this.props.updateId(this.props.listEle._id)}></i>
                </div>
            </div>
        )
    }
}
export default TodoList;
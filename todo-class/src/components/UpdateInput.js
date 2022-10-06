import React from "react";
class UpdateInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newTask: ''
        }
    }
    updateTask = async(uid) => {
        if (this.state.newTask !== '') {
            const result = await fetch('http://localhost:4000/todo/' + uid + '/update', {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    activity: this.state.newTask
                })
            }).then(res => res.json());
            const arr = this.props.newList.findIndex((e => e._id === uid));
            this.props.newList[arr].activity = result.activity;
            this.props.newList[arr].complete = result.complete;
            this.props.changeId('')
        }
        else {
            alert('Enter correct details')
        }
    }
    componentDidUpdate(prevProps){
        if(prevProps.newList!==this.props.newList){
            this.props.changeData()
        }
    }
    render() {
        return (
            <div className="incomplete" style={{ backgroundColor: "rgb(108, 196, 152)" }} key={this.props.listEle._id}>
                <label>Enter task: </label>
                <input type="text" className="activity" onChange={(e) => this.setState({newTask:e.target.value})} value={this.state.newTask} style={{ width: "200px" }} />
                <div className="icons">
                    <i className="ri-check-fill" onClick={() => this.updateTask(this.props.listEle._id)}></i>
                    <i className="ri-close-circle-fill" onClick={() => this.props.updateId(this.props.listEle._id)}></i>
                </div>
            </div>
        )
    }
}
export default UpdateInput;